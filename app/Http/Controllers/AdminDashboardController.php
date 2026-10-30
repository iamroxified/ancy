<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\Member;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index(Request $request)
    {
        $query = Member::query();

        if ($request->filled('search')) {
            $search = trim($request->search);
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                    ->orWhere('membership_number', 'like', "%{$search}%")
                    ->orWhere('state', 'like', "%{$search}%")
                    ->orWhere('lga', 'like', "%{$search}%")
                    ->orWhere('ward', 'like', "%{$search}%")
                    ->orWhere('polling_unit', 'like', "%{$search}%");

                if (preg_match('/^[A-Za-z0-9]+$/', $search)) {
                    $q->orWhere('vin_lookup_hash', Member::hashVin($search));
                    $q->orWhere('phone_lookup_hash', Member::hashPhone($search));
                }
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('state')) {
            $query->where('state', $request->state);
        }

        if ($request->filled('lga')) {
            $query->where('lga', 'like', "%{$request->lga}%");
        }

        $members = $query->orderByDesc('created_at')->paginate(15)->withQueryString();

        $stats = [
            'total' => Member::count(),
            'pending' => Member::where('status', 'pending')->count(),
            'approved' => Member::where('status', 'approved')->count(),
            'rejected_or_inactive' => Member::whereIn('status', ['rejected', 'inactive'])->count(),
            'today' => Member::whereDate('created_at', today())->count(),
            'by_state' => Member::query()->selectRaw('state, count(*) as total')->groupBy('state')->orderByDesc('total')->get(),
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'members' => $members->through(fn ($member) => [
                'id' => $member->id,
                'membership_number' => $member->membership_number,
                'full_name' => $member->full_name,
                'vin' => $member->maskedVin(),
                'phone_number' => $member->maskedPhone(),
                'state' => $member->state,
                'lga' => $member->lga,
                'ward' => $member->ward,
                'polling_unit' => $member->polling_unit,
                'created_at' => $member->created_at?->format('Y-m-d H:i:s'),
                'status' => $member->status,
            ]),
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'state' => $request->state,
                'lga' => $request->lga,
            ],
            'states' => config('ancyn.states'),
            'statuses' => ['pending', 'approved', 'rejected', 'inactive'],
            'organizationName' => SiteSetting::value('organization_name', config('ancyn.organization_name')),
        ]);
    }

    public function saveSettings(Request $request)
    {
        $payload = $request->validate([
            'organization_name' => ['required', 'string', 'max:255'],
            'about_us' => ['required', 'string'],
            'vision' => ['required', 'string'],
            'mission' => ['required', 'string'],
            'contact_email' => ['required', 'email'],
            'contact_phone' => ['required', 'string'],
            'contact_address' => ['required', 'string'],
        ]);

        foreach ($payload as $key => $value) {
            SiteSetting::query()->updateOrCreate(['key' => $key], ['value' => $value]);
        }

        AuditLog::record('site_settings_updated', $payload);

        return back()->with('success', 'The ANCYN public website settings were updated.');
    }

    public function export(Request $request)
    {
        $query = Member::query();

        if ($request->filled('search')) {
            $search = trim($request->search);
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                    ->orWhere('membership_number', 'like', "%{$search}%")
                    ->orWhere('state', 'like', "%{$search}%")
                    ->orWhere('lga', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('state')) {
            $query->where('state', $request->state);
        }

        $filename = 'ancyn_members_'.now()->format('Ymd_His').'.csv';

        return response()->streamDownload(function () use ($query) {
            $handle = fopen('php://output', 'wb');
            fputcsv($handle, ['Membership Number', 'Full Name', 'State', 'LGA', 'Ward', 'Polling Unit', 'Status', 'Created At']);

            foreach ($query->orderByDesc('created_at')->cursor() as $member) {
                fputcsv($handle, [
                    $member->membership_number,
                    $member->full_name,
                    $member->state,
                    $member->lga,
                    $member->ward,
                    $member->polling_unit,
                    $member->status,
                    $member->created_at->format('Y-m-d H:i:s'),
                ]);
            }

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv',
            'Cache-Control' => 'no-store, no-cache, must-revalidate',
        ]);
    }
}
