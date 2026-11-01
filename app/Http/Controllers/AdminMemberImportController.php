<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\Member;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use RuntimeException;

class AdminMemberImportController extends Controller
{
    private const MAX_ROWS = 50000;

    private const MAX_FILE_SIZE_KB = 20480;

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'file' => ['required', 'file', 'mimes:csv,txt', 'max:'.self::MAX_FILE_SIZE_KB],
        ]);

        $stream = fopen($validated['file']->getRealPath(), 'rb');

        if ($stream === false) {
            throw new RuntimeException('Unable to read the uploaded CSV file.');
        }

        try {
            $headers = fgetcsv($stream, null, ',', '"', '');

            if ($headers === false) {
                throw ValidationException::withMessages([
                    'file' => 'The CSV file is empty.',
                ]);
            }

            $columns = $this->mapColumns($headers);
            $rows = [];
            $line = 1;

            while (($cells = fgetcsv($stream, null, ',', '"', '')) !== false) {
                $line++;

                if (count($cells) === 1 && trim((string) $cells[0]) === '') {
                    continue;
                }

                if (count($rows) >= self::MAX_ROWS) {
                    throw ValidationException::withMessages([
                        'file' => 'The CSV file may contain no more than '.self::MAX_ROWS.' data rows.',
                    ]);
                }

                $name = $this->cell($cells, $columns['name']);

                if ($name !== null && mb_strlen($name) > 255) {
                    throw ValidationException::withMessages([
                        'file' => "The Name value on row {$line} exceeds 255 characters.",
                    ]);
                }

                $vin = $this->cell($cells, $columns['vin']);
                $vin = $vin === null ? null : strtoupper($vin);

                $rows[] = [
                    'full_name' => $name,
                    'vin' => $vin,
                    'vin_hash' => $vin === null ? null : Member::hashVin($vin),
                    'phone_number' => $this->cell($cells, $columns['phone']),
                ];
            }
        } finally {
            fclose($stream);
        }

        $candidateHashes = collect($rows)
            ->pluck('vin_hash')
            ->filter()
            ->unique()
            ->values();
        $existingHashes = [];

        foreach ($candidateHashes->chunk(500) as $hashes) {
            foreach (Member::query()->whereIn('vin_lookup_hash', $hashes)->pluck('vin_lookup_hash') as $hash) {
                $existingHashes[$hash] = true;
            }
        }

        $importedCount = 0;
        $duplicateCount = 0;
        $seenHashes = [];

        DB::transaction(function () use ($rows, $existingHashes, &$importedCount, &$duplicateCount, &$seenHashes): void {
            foreach ($rows as $row) {
                $hash = $row['vin_hash'];

                if ($hash !== null && (isset($existingHashes[$hash]) || isset($seenHashes[$hash]))) {
                    $duplicateCount++;

                    continue;
                }

                if ($hash !== null) {
                    $seenHashes[$hash] = true;
                }

                Member::query()->create([
                    'membership_number' => null,
                    'full_name' => $row['full_name'],
                    'vin' => $row['vin'],
                    'phone_number' => $row['phone_number'],
                    'state' => null,
                    'lga' => null,
                    'ward' => null,
                    'polling_unit' => null,
                    'polling_unit_id' => null,
                    'privacy_consent_at' => null,
                    'status' => 'pending',
                ]);

                $importedCount++;
            }

            AuditLog::record('members_imported', [
                'imported_count' => $importedCount,
                'duplicate_vin_count' => $duplicateCount,
            ]);
        });

        return back()->with(
            'success',
            "CSV import complete: {$importedCount} imported, {$duplicateCount} skipped because of duplicate VINs."
        );
    }

    /**
     * @param  array<int, string|null>  $headers
     * @return array{vin: int, name: int, phone: int}
     */
    private function mapColumns(array $headers): array
    {
        $columns = [];

        foreach ($headers as $index => $header) {
            $normalized = strtolower(preg_replace('/[^a-z0-9]/i', '', preg_replace('/^\xEF\xBB\xBF/', '', trim((string) $header)) ?? '') ?? '');
            $key = match ($normalized) {
                'vin' => 'vin',
                'name' => 'name',
                'phone', 'phonee', 'phonenumber' => 'phone',
                default => null,
            };

            if ($key !== null) {
                $columns[$key] ??= $index;
            }
        }

        if (! isset($columns['vin'], $columns['name'], $columns['phone'])) {
            throw ValidationException::withMessages([
                'file' => 'The CSV must include VIN, Name, and Phonee columns.',
            ]);
        }

        return $columns;
    }

    /**
     * @param  array<int, string|null>  $cells
     */
    private function cell(array $cells, int $index): ?string
    {
        $value = trim((string) ($cells[$index] ?? ''));

        return $value === '' ? null : $value;
    }
}
