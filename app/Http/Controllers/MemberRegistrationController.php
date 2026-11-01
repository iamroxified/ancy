<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\LocationState;
use App\Models\Member;
use App\Models\PollingUnit;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class MemberRegistrationController extends Controller
{
    public function create()
    {
        return Inertia::render('membership/register', [
            'states' => LocationState::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'vin' => ['required', 'string', 'min:5', 'max:25', 'regex:/^[A-Za-z0-9]+$/'],
            'phone_number' => ['required', 'string', 'regex:/^(\+234|234|0)[789][01]\d{8}$/'],
            'state_id' => ['required', 'integer', 'exists:location_states,id'],
            'local_government_id' => ['required', 'integer', Rule::exists('local_governments', 'id')->where('location_state_id', $request->input('state_id'))],
            'ward_id' => ['required', 'integer', Rule::exists('location_wards', 'id')->where('local_government_id', $request->input('local_government_id'))],
            'polling_unit_id' => ['required', 'integer', Rule::exists('polling_units', 'id')->where('location_ward_id', $request->input('ward_id'))],
            'privacy_consent' => ['accepted'],
        ], [
            'phone_number.regex' => 'Enter a valid Nigerian phone number, for example 08031234567 or +2348031234567.',
            'privacy_consent.accepted' => 'You must accept the privacy notice before submitting your registration.',
        ]);

        $normalizedPhone = Member::normalizePhone((string) $request->input('phone_number'));
        $vin = strtoupper(trim($request->string('vin')));
        $pollingUnit = PollingUnit::query()->with('ward.localGovernment.state')->findOrFail($validated['polling_unit_id']);
        $stateName = $pollingUnit->ward->localGovernment->state->name;
        $lgaName = $pollingUnit->ward->localGovernment->name;
        $wardName = $pollingUnit->ward->name;
        $pollingUnitName = $pollingUnit->name;

        if (Member::query()->where('vin_lookup_hash', Member::hashVin($vin))->exists()) {
            return back()->withErrors([
                'vin' => 'A registration with this VIN already exists. Please contact ANCY support if your record needs updating.',
            ])->withInput();
        }

        try {
            $member = DB::transaction(function () use ($request, $vin, $normalizedPhone, $pollingUnit, $stateName, $lgaName, $wardName, $pollingUnitName) {
                $member = Member::query()->create([
                    'full_name' => trim($request->input('full_name')),
                    'vin' => $vin,
                    'phone_number' => $normalizedPhone,
                    'state' => $stateName,
                    'lga' => $lgaName,
                    'ward' => $wardName,
                    'polling_unit' => $pollingUnitName,
                    'polling_unit_id' => $pollingUnit->id,
                    'privacy_consent_at' => now(),
                    'status' => 'pending',
                ]);

                AuditLog::record('member_registration', [
                    'member_id' => $member->id,
                    'membership_number' => $member->membership_number,
                    'state' => $member->state,
                ], Member::class, $member->id);

                return $member;
            });
        } catch (UniqueConstraintViolationException) {
            return back()->withErrors([
                'vin' => 'A registration with this VIN already exists. Please contact ANCY support if your record needs updating.',
            ])->withInput();
        }

        return redirect()->route('register.confirmation')->with('membership_number', $member->membership_number);
    }

    public function confirmation()
    {
        return Inertia::render('membership/confirmation', [
            'membershipNumber' => session('membership_number'),
        ]);
    }
}
