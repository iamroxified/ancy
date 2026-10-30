<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\Member;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminMemberController extends Controller
{
    public function show(Member $member)
    {
        AuditLog::record('member_record_viewed', ['member_id' => $member->id, 'membership_number' => $member->membership_number], Member::class, $member->id);

        return Inertia::render('admin/member', [
            'member' => [
                'id' => $member->id,
                'membership_number' => $member->membership_number,
                'full_name' => $member->full_name,
                'vin' => $member->maskedVin(),
                'phone_number' => $member->maskedPhone(),
                'state' => $member->state,
                'lga' => $member->lga,
                'ward' => $member->ward,
                'polling_unit' => $member->polling_unit,
                'status' => $member->status,
                'created_at' => $member->created_at?->format('Y-m-d H:i:s'),
            ],
            'states' => config('ancyn.states'),
            'lgas' => config('ancyn.lgas'),
        ]);
    }

    public function update(Request $request, Member $member)
    {
        $state = $request->input('state');
        $stateLgas = config('ancyn.lgas', [])[$state] ?? [];
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'vin' => ['nullable', 'string', 'min:5', 'max:25', 'regex:/^[A-Za-z0-9]+$/'],
            'phone_number' => ['nullable', 'string', 'regex:/^(\\+234|234|0)[789][01]\\d{8}$/'],
            'state' => ['required', Rule::in(config('ancyn.states'))],
            'lga' => ['required', 'string', 'max:150', Rule::in($stateLgas)],
            'ward' => ['required', 'string', 'max:150'],
            'polling_unit' => ['required', 'string', 'max:200'],
        ]);

        $updates = [
            'full_name' => trim($validated['full_name']),
            'state' => $validated['state'],
            'lga' => trim($validated['lga']),
            'ward' => trim($validated['ward']),
            'polling_unit' => trim($validated['polling_unit']),
        ];
        $changedFields = [];

        foreach ($updates as $field => $value) {
            if ($member->{$field} !== $value) {
                $member->{$field} = $value;
                $changedFields[] = $field;
            }
        }

        if (! empty($validated['vin'])) {
            $vin = strtoupper(trim($validated['vin']));
            $hash = Member::hashVin($vin);

            if (Member::query()->where('vin_lookup_hash', $hash)->whereKeyNot($member->id)->exists()) {
                return back()->withErrors(['vin' => 'That VIN is already associated with another member record.'])->withInput();
            }

            if ($member->vin !== $vin) {
                $member->vin = $vin;
                $changedFields[] = 'vin';
            }
        }

        if (! empty($validated['phone_number'])) {
            $phone = Member::normalizePhone($validated['phone_number']);
            if ($member->phone_number !== $phone) {
                $member->phone_number = $phone;
                $changedFields[] = 'phone_number';
            }
        }

        if ($changedFields === []) {
            return back()->with('success', 'No member details needed updating.');
        }

        try {
            DB::transaction(function () use ($member, $changedFields): void {
                $member->save();
                AuditLog::record('member_record_updated', [
                    'member_id' => $member->id,
                    'fields' => $changedFields,
                ], Member::class, $member->id);
            });
        } catch (UniqueConstraintViolationException) {
            return back()->withErrors(['vin' => 'That VIN is already associated with another member record.'])->withInput();
        }

        return back()->with('success', 'Member details updated successfully.');
    }

    public function updateStatus(Request $request, Member $member)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,approved,rejected,inactive'],
        ]);

        $previous = $member->status;
        $member->status = $validated['status'];
        $member->save();

        AuditLog::record('member_status_updated', [
            'member_id' => $member->id,
            'from' => $previous,
            'to' => $validated['status'],
        ], Member::class, $member->id);

        return back()->with('success', 'Member status updated successfully.');
    }
}
