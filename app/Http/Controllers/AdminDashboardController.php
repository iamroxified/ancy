<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\Member;
use App\Models\SiteSetting;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index(Request $request)
    {
        $filters = $this->validatedFilters($request);
        $members = $this->filteredMembers($filters)
            ->orderBy($filters['sort'] ?? 'created_at', $filters['direction'] ?? 'desc')
            ->paginate(15)
            ->withQueryString();

        $stats = [
            'total' => Member::count(),
            'pending' => Member::where('status', 'pending')->count(),
            'approved' => Member::where('status', 'approved')->count(),
            'rejected_or_inactive' => Member::whereIn('status', ['rejected', 'inactive'])->count(),
            'today' => Member::whereDate('created_at', today())->count(),
            'by_state' => Member::query()->selectRaw('state, count(*) as total')->groupBy('state')->orderByDesc('total')->get(),
            'by_lga' => Member::query()->selectRaw('state, lga, count(*) as total')->groupBy('state', 'lga')->orderBy('state')->orderByDesc('total')->get(),
            'by_day' => Member::query()
                ->where('created_at', '>=', now()->subDays(29)->startOfDay())
                ->selectRaw('date(created_at) as date, count(*) as total')
                ->groupBy('date')
                ->orderBy('date')
                ->get(),
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
                ...$filters,
            ],
            'states' => config('ancyn.states'),
            'lgas' => config('ancyn.lgas'),
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
        $filters = $this->validatedFilters($request);
        $query = $this->filteredMembers($filters);
        AuditLog::record('member_exported', [
            'filters' => array_filter($filters, fn ($value) => $value !== null && $value !== ''),
            'includes_sensitive_fields' => false,
        ]);

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

    /** @return array<string, string|null> */
    private function validatedFilters(Request $request): array
    {
        return $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', Rule::in(['pending', 'approved', 'rejected', 'inactive'])],
            'state' => ['nullable', Rule::in(config('ancyn.states'))],
            'lga' => ['nullable', 'string', 'max:150'],
            'ward' => ['nullable', 'string', 'max:150'],
            'polling_unit' => ['nullable', 'string', 'max:200'],
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date', 'after_or_equal:from'],
            'sort' => ['nullable', Rule::in(['created_at', 'full_name', 'membership_number', 'state', 'status'])],
            'direction' => ['nullable', Rule::in(['asc', 'desc'])],
        ]);
    }

    /** @param array<string, string|null> $filters */
    private function filteredMembers(array $filters): Builder
    {
        $query = Member::query();

        if (! empty($filters['search'])) {
            $search = trim($filters['search']);
            $query->where(function (Builder $builder) use ($search) {
                $builder->where('full_name', 'like', "%{$search}%")
                    ->orWhere('membership_number', 'like', "%{$search}%")
                    ->orWhere('state', 'like', "%{$search}%")
                    ->orWhere('lga', 'like', "%{$search}%")
                    ->orWhere('ward', 'like', "%{$search}%")
                    ->orWhere('polling_unit', 'like', "%{$search}%");

                if (preg_match('/^[A-Za-z0-9]+$/', $search)) {
                    $builder->orWhere('vin_lookup_hash', Member::hashVin($search));
                }

                if (preg_match('/^[+0-9\s().-]+$/', $search)) {
                    $builder->orWhere('phone_lookup_hash', Member::hashPhone($search));
                }
            });
        }

        foreach (['status', 'state'] as $field) {
            if (! empty($filters[$field])) {
                $query->where($field, $filters[$field]);
            }
        }

        foreach (['lga', 'ward', 'polling_unit'] as $field) {
            if (! empty($filters[$field])) {
                $query->where($field, 'like', '%'.$filters[$field].'%');
            }
        }

        if (! empty($filters['from'])) {
            $query->whereDate('created_at', '>=', $filters['from']);
        }

        if (! empty($filters['to'])) {
            $query->whereDate('created_at', '<=', $filters['to']);
        }

        return $query;
    }
}
