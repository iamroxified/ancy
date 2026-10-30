<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\Member;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MemberRegistrationController extends Controller
{
    public function create()
    {
        return Inertia::render('membership/register', [
            'states' => config('ancyn.states'),
            'lgas' => config('ancyn.lgas'),
        ]);
    }

    public function store(Request $request)
    {
        $state = $request->input('state');
        $stateLgas = config('ancyn.lgas', [])[$state] ?? [];

        $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'vin' => ['required', 'string', 'min:5', 'max:25', 'regex:/^[A-Za-z0-9]+$/'],
            'phone_number' => ['required', 'string', 'regex:/^(\+234|234|0)[789][01]\d{8}$/'],
            'state' => ['required', Rule::in(config('ancyn.states'))],
            'lga' => ['required', 'string', 'max:150', Rule::in($stateLgas)],
            'ward' => ['required', 'string', 'max:150'],
            'polling_unit' => ['required', 'string', 'max:200'],
            'privacy_consent' => ['accepted'],
        ], [
            'phone_number.regex' => 'Enter a valid Nigerian phone number, for example 08031234567 or +2348031234567.',
            'privacy_consent.accepted' => 'You must accept the privacy notice before submitting your registration.',
        ]);

        $normalizedPhone = $this->normalizePhone((string) $request->input('phone_number'));
        $vin = strtoupper(trim($request->string('vin')));

        if (Member::query()->where('vin_lookup_hash', Member::hashVin($vin))->exists()) {
            return back()->withErrors([
                'vin' => 'A registration with this VIN already exists. Please contact ANCYN support if your record needs updating.',
            ])->withInput();
        }

        try {
            $member = DB::transaction(function () use ($request, $vin, $normalizedPhone) {
                $member = Member::query()->create([
                    'full_name' => trim($request->input('full_name')),
                    'vin' => $vin,
                    'phone_number' => $normalizedPhone,
                    'state' => $request->input('state'),
                    'lga' => trim($request->input('lga')),
                    'ward' => trim($request->input('ward')),
                    'polling_unit' => trim($request->input('polling_unit')),
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
                'vin' => 'A registration with this VIN already exists. Please contact ANCYN support if your record needs updating.',
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

    private function normalizePhone(string $phone): string
    {
        $digits = preg_replace('/\D+/', '', $phone);

        if (empty($digits)) {
            return $phone;
        }

        if (str_starts_with($digits, '234')) {
            return '+'.$digits;
        }

        if (str_starts_with($digits, '0')) {
            return '+234'.substr($digits, 1);
        }

        return '+234'.$digits;
    }
}
