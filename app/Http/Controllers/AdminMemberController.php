<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\LocalGovernment;
use App\Models\LocationState;
use App\Models\LocationWard;
use App\Models\Member;
use App\Models\PollingUnit;
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
        $member->load('pollingUnit.ward.localGovernment.state');
        $state = $member->pollingUnit?->ward?->localGovernment?->state
            ?? LocationState::query()->where('name', $member->state)->first();
        $localGovernment = $member->pollingUnit?->ward?->localGovernment
            ?? LocalGovernment::query()->where('location_state_id', $state?->id)->where('name', $member->lga)->first();
        $ward = $member->pollingUnit?->ward
            ?? LocationWard::query()->where('local_government_id', $localGovernment?->id)->where('name', $member->ward)->first();
        $pollingUnit = $member->pollingUnit
            ?? PollingUnit::query()->where('location_ward_id', $ward?->id)->where('name', $member->polling_unit)->first();

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
                'state_id' => $state?->id,
                'local_government_id' => $localGovernment?->id,
                'ward_id' => $ward?->id,
                'polling_unit_id' => $pollingUnit?->id,
            ],
            'states' => LocationState::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'vin' => ['nullable', 'string', 'min:5', 'max:25', 'regex:/^[A-Za-z0-9]+$/'],
            'phone_number' => ['nullable', 'string', 'regex:/^(\\+234|234|0)[789][01]\\d{8}$/'],
            'state_id' => ['required', 'integer', 'exists:location_states,id'],
            'local_government_id' => ['required', 'integer', Rule::exists('local_governments', 'id')->where('location_state_id', $request->input('state_id'))],
            'ward_id' => ['required', 'integer', Rule::exists('location_wards', 'id')->where('local_government_id', $request->input('local_government_id'))],
            'polling_unit_id' => ['required', 'integer', Rule::exists('polling_units', 'id')->where('location_ward_id', $request->input('ward_id'))],
        ]);

        $pollingUnit = PollingUnit::query()->with('ward.localGovernment.state')->findOrFail($validated['polling_unit_id']);

        $updates = [
            'full_name' => trim($validated['full_name']),
            'state' => $pollingUnit->ward->localGovernment->state->name,
            'lga' => $pollingUnit->ward->localGovernment->name,
            'ward' => $pollingUnit->ward->name,
            'polling_unit' => $pollingUnit->name,
            'polling_unit_id' => $pollingUnit->id,
        ];
        $changedFields = [];

        foreach ($updates as $field => $value) {
            if ($member->{$field} !== $value || ($field === 'polling_unit_id' && (int) $member->{$field} !== (int) $value)) {
                $member->{$field} = $value;
                $changedFields[] = $field === 'polling_unit_id' ? 'polling_unit' : $field;
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
