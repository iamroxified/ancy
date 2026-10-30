<?php

namespace Database\Seeders;

use App\Models\LocationState;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use RuntimeException;

class LocationCatalogSeeder extends Seeder
{
    public function run(): void
    {
        $datasetPath = base_path('states-and-lgas-and-wards-and-polling-units.json');

        if (! is_file($datasetPath)) {
            throw new RuntimeException('The supplied location dataset was not found at the project root.');
        }

        $dataset = json_decode(file_get_contents($datasetPath), true, flags: JSON_THROW_ON_ERROR);
        $stateNames = collect(config('ancyn.states'))
            ->mapWithKeys(fn (string $name) => [Str::slug($name) => $name])
            ->put('abuja', 'Federal Capital Territory');
        $selectedStates = collect($dataset)
            ->filter(fn (array $state) => $stateNames->has($state['state'] ?? ''))
            ->values();

        if ($selectedStates->count() !== 7) {
            throw new RuntimeException('The location dataset must include all seven ANCYN coverage areas.');
        }

        DB::transaction(function () use ($selectedStates, $stateNames): void {
            $timestamp = now();
            $states = $selectedStates->map(fn (array $state) => [
                'code' => $state['state'],
                'name' => $stateNames->get($state['state']),
                'created_at' => $timestamp,
                'updated_at' => $timestamp,
            ])->all();

            LocationState::query()->upsert($states, ['code'], ['name', 'updated_at']);
            $stateIds = LocationState::query()
                ->whereIn('code', array_column($states, 'code'))
                ->pluck('id', 'code');

            $localGovernments = [];
            foreach ($selectedStates as $state) {
                foreach ($state['lgas'] as $lga) {
                    $localGovernments[] = [
                        'location_state_id' => $stateIds[$state['state']],
                        'source_key' => $lga['lga'],
                        'name' => $this->displayName($lga['lga']),
                        'created_at' => $timestamp,
                        'updated_at' => $timestamp,
                    ];
                }
            }

            DB::table('local_governments')->upsert($localGovernments, ['location_state_id', 'source_key'], ['name', 'updated_at']);
            $lgaRows = DB::table('local_governments')
                ->whereIn('location_state_id', $stateIds->values())
                ->get(['id', 'location_state_id', 'source_key']);
            $lgaIds = $lgaRows->mapWithKeys(fn (object $lga) => [$lga->location_state_id.':'.$lga->source_key => $lga->id]);

            $wards = [];
            foreach ($selectedStates as $state) {
                foreach ($state['lgas'] as $lga) {
                    $lgaId = $lgaIds[$stateIds[$state['state']].':'.$lga['lga']];
                    foreach ($lga['wards'] as $ward) {
                        $wards[] = [
                            'local_government_id' => $lgaId,
                            'source_key' => $ward['ward'],
                            'name' => $this->displayName($ward['ward']),
                            'created_at' => $timestamp,
                            'updated_at' => $timestamp,
                        ];
                    }
                }
            }

            DB::table('location_wards')->upsert($wards, ['local_government_id', 'source_key'], ['name', 'updated_at']);
            $wardRows = DB::table('location_wards')
                ->whereIn('local_government_id', $lgaRows->pluck('id'))
                ->get(['id', 'local_government_id', 'source_key']);
            $wardIds = $wardRows->mapWithKeys(fn (object $ward) => [$ward->local_government_id.':'.$ward->source_key => $ward->id]);

            $pollingUnits = [];
            foreach ($selectedStates as $state) {
                foreach ($state['lgas'] as $lga) {
                    $lgaId = $lgaIds[$stateIds[$state['state']].':'.$lga['lga']];
                    foreach ($lga['wards'] as $ward) {
                        $wardId = $wardIds[$lgaId.':'.$ward['ward']];
                        foreach ($ward['polling_units'] as $unit) {
                            $pollingUnits[] = [
                                'location_ward_id' => $wardId,
                                'source_key' => $unit,
                                'name' => $this->displayName($unit),
                                'created_at' => $timestamp,
                                'updated_at' => $timestamp,
                            ];
                        }
                    }
                }
            }

            foreach (array_chunk($pollingUnits, 500) as $chunk) {
                DB::table('polling_units')->upsert($chunk, ['location_ward_id', 'source_key'], ['name', 'updated_at']);
            }
        });
    }

    private function displayName(string $sourceName): string
    {
        return Str::title(str_replace('-', ' ', trim($sourceName)));
    }
}
