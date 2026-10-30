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

    public function settings()
    {
        return Inertia::render('admin/settings', [
            'settings' => [
                'organization_name' => SiteSetting::value('organization_name', config('ancyn.organization_name')),
                'about_us' => SiteSetting::value('about_us', config('ancyn.default_about')),
                'vision' => SiteSetting::value('vision', config('ancyn.default_vision')),
                'mission' => SiteSetting::value('mission', config('ancyn.default_mission')),
                'core_values' => implode("\n", $this->settingList('core_values', config('ancyn.default_core_values'))),
                'objectives' => implode("\n", $this->settingList('objectives', config('ancyn.default_objectives'))),
                'programs' => implode("\n", $this->settingList('programs', config('ancyn.default_programs'))),
                'privacy_notice' => SiteSetting::value('privacy_notice', config('ancyn.default_privacy')),
                'member_retention_days' => SiteSetting::value('member_retention_days', config('ancyn.retention.member_days')),
                'contact_message_retention_days' => SiteSetting::value('contact_message_retention_days', config('ancyn.retention.contact_message_days')),
                'contact_email' => SiteSetting::value('contact_email', config('ancyn.default_contact.email')),
                'contact_phone' => SiteSetting::value('contact_phone', config('ancyn.default_contact.phone')),
                'contact_address' => SiteSetting::value('contact_address', config('ancyn.default_contact.address')),
                'facebook_url' => SiteSetting::value('facebook_url', config('ancyn.default_contact.facebook')),
                'x_url' => SiteSetting::value('x_url', config('ancyn.default_contact.x')),
                'instagram_url' => SiteSetting::value('instagram_url', config('ancyn.default_contact.instagram')),
                'linkedin_url' => SiteSetting::value('linkedin_url', config('ancyn.default_contact.linkedin')),
            ],
        ]);
    }

    public function saveSettings(Request $request)
    {
        $payload = $request->validate([
            'organization_name' => ['required', 'string', 'max:255'],
            'about_us' => ['required', 'string', 'max:5000'],
            'vision' => ['required', 'string', 'max:2000'],
            'mission' => ['required', 'string', 'max:2000'],
            'core_values' => ['required', 'string', 'max:5000'],
            'objectives' => ['required', 'string', 'max:10000'],
            'programs' => ['required', 'string', 'max:10000'],
            'privacy_notice' => ['required', 'string', 'max:10000'],
            'member_retention_days' => ['required', 'integer', 'min:0', 'max:36500'],
            'contact_message_retention_days' => ['required', 'integer', 'min:0', 'max:36500'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:60'],
            'contact_address' => ['nullable', 'string', 'max:500'],
            'facebook_url' => ['nullable', 'url', 'max:255'],
            'x_url' => ['nullable', 'url', 'max:255'],
            'instagram_url' => ['nullable', 'url', 'max:255'],
            'linkedin_url' => ['nullable', 'url', 'max:255'],
        ]);

        $lists = ['core_values', 'objectives', 'programs'];
        foreach ($lists as $key) {
            $payload[$key] = json_encode(array_values(array_filter(array_map('trim', preg_split('/\\R/', $payload[$key])))));
        }

        $settings = [
            'organization_name' => 'organization_name',
            'about_us' => 'about_us',
            'vision' => 'vision',
            'mission' => 'mission',
            'core_values' => 'core_values',
            'objectives' => 'objectives',
            'programs' => 'programs',
            'privacy_notice' => 'privacy_notice',
            'member_retention_days' => 'member_retention_days',
            'contact_message_retention_days' => 'contact_message_retention_days',
            'contact_email' => 'contact_email',
            'contact_phone' => 'contact_phone',
            'contact_address' => 'contact_address',
            'facebook_url' => 'facebook_url',
            'x_url' => 'x_url',
            'instagram_url' => 'instagram_url',
            'linkedin_url' => 'linkedin_url',
        ];

        foreach ($settings as $key => $settingKey) {
            $value = $payload[$key];
            SiteSetting::query()->updateOrCreate(['key' => $settingKey], ['value' => $value]);
        }

        AuditLog::record('site_settings_updated', ['updated_keys' => array_keys($settings)]);

        return back()->with('success', 'The ANCYN public website settings were updated.');
    }

    public function export(Request $request)
    {
        $filters = $this->validatedFilters($request);
        $query = $this->filteredMembers($filters);
        $auditFilters = $filters;
        $searchPerformed = ! empty($auditFilters['search']);
        unset($auditFilters['search']);
        AuditLog::record('member_exported', [
            'filters' => array_filter($auditFilters, fn ($value) => $value !== null && $value !== ''),
            'search_performed' => $searchPerformed,
            'includes_sensitive_fields' => false,
        ]);

        $filename = 'ancyn_members_'.now()->format('Ymd_His').'.csv';

        $sort = $filters['sort'] ?? 'created_at';
        $direction = $filters['direction'] ?? 'desc';

        return response()->streamDownload(function () use ($query, $sort, $direction) {
            $handle = fopen('php://output', 'wb');
            fputcsv($handle, ['Membership Number', 'Full Name', 'State', 'LGA', 'Ward', 'Polling Unit', 'Status', 'Created At']);

            foreach ($query->orderBy($sort, $direction)->cursor() as $member) {
                fputcsv($handle, [
                    $this->csvSafe($member->membership_number),
                    $this->csvSafe($member->full_name),
                    $this->csvSafe($member->state),
                    $this->csvSafe($member->lga),
                    $this->csvSafe($member->ward),
                    $this->csvSafe($member->polling_unit),
                    $this->csvSafe($member->status),
                    $this->csvSafe($member->created_at->format('Y-m-d H:i:s')),
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

    /** @param array<int, string> $default */
    private function settingList(string $key, array $default): array
    {
        $value = SiteSetting::value($key, json_encode($default));
        $list = json_decode((string) $value, true);

        return is_array($list) ? array_values(array_filter($list, 'is_string')) : $default;
    }

    private function csvSafe(string $value): string
    {
        return preg_match('/^[\t\r ]*[=+\-@]/', $value) ? "'".$value : $value;
    }
}
