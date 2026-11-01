<?php

use App\Models\AuditLog;
use App\Models\ContactMessage;
use App\Models\LocalGovernment;
use App\Models\LocationState;
use App\Models\LocationWard;
use App\Models\Member;
use App\Models\PollingUnit;
use App\Models\SiteSetting;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\LocationCatalogSeeder;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;

uses(WithFaker::class);

beforeEach(function () {
    $this->seed(LocationCatalogSeeder::class);
});

function memberLocationSelection(string $stateCode = 'kogi'): array
{
    $state = LocationState::query()->where('code', $stateCode)->firstOrFail();
    $localGovernment = LocalGovernment::query()->where('location_state_id', $state->id)->firstOrFail();
    $ward = LocationWard::query()->where('local_government_id', $localGovernment->id)->firstOrFail();
    $pollingUnit = PollingUnit::query()->where('location_ward_id', $ward->id)->firstOrFail();

    return [
        'state_id' => $state->id,
        'local_government_id' => $localGovernment->id,
        'ward_id' => $ward->id,
        'polling_unit_id' => $pollingUnit->id,
    ];
}

test('a visitor can register a member with valid data', function () {
    $selection = memberLocationSelection();
    $response = $this->post('/register/member', [
        'full_name' => 'Ada Okafor',
        'vin' => 'AB12345678',
        'phone_number' => '08031234567',
        ...$selection,
        'privacy_consent' => '1',
    ]);

    $response->assertRedirect('/register/confirmation');
    $this->assertDatabaseHas('members', [
        'full_name' => 'Ada Okafor',
        'state' => 'Kogi',
        'polling_unit_id' => $selection['polling_unit_id'],
    ]);

    expect(substr(Member::query()->firstOrFail()->membership_number, 0, 5))->toBe('ANCY-');
});

test('the public homepage uses the ANCY abbreviation', function () {
    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('organization.abbreviation', 'ANCY')
        );
});

test('existing site settings are corrected from ANCYN to ANCY', function () {
    SiteSetting::query()->updateOrCreate(['key' => 'abbreviation'], ['value' => 'ANCYN']);
    SiteSetting::query()->updateOrCreate(['key' => 'about_us'], ['value' => 'About ANCYN']);
    SiteSetting::query()->updateOrCreate(['key' => 'privacy_notice'], ['value' => 'Privacy for ANCYN']);

    $migration = require database_path('migrations/2026_11_01_000001_correct_site_abbreviation.php');
    $migration->up();

    expect(SiteSetting::value('abbreviation'))->toBe('ANCY')
        ->and(SiteSetting::value('about_us'))->toBe('About ANCY')
        ->and(SiteSetting::value('privacy_notice'))->toBe('Privacy for ANCY');
});

test('duplicate VIN registrations are rejected', function () {
    $this->post('/register/member', [
        'full_name' => 'Ada Okafor',
        'vin' => 'AB12345678',
        'phone_number' => '08031234567',
        ...memberLocationSelection(),
        'privacy_consent' => '1',
    ]);

    $response = $this->post('/register/member', [
        'full_name' => 'Ada Okafor Two',
        'vin' => 'AB12345678',
        'phone_number' => '08031234568',
        ...memberLocationSelection('benue'),
        'privacy_consent' => '1',
    ]);

    $response->assertSessionHasErrors('vin');
});

test('a state cannot be paired with an LGA from another state', function () {
    $response = $this->post('/register/member', [
        'full_name' => 'Ada Okafor',
        'vin' => 'AB12345679',
        'phone_number' => '08031234567',
        ...memberLocationSelection('benue'),
        'state_id' => LocationState::query()->where('code', 'kogi')->value('id'),
        'privacy_consent' => '1',
    ]);

    $response->assertSessionHasErrors('local_government_id');
    $this->assertDatabaseCount('members', 0);
});

test('location endpoints return only child options for the selected parent', function () {
    $selection = memberLocationSelection();
    $localGovernment = LocalGovernment::query()->findOrFail($selection['local_government_id']);
    $ward = LocationWard::query()->findOrFail($selection['ward_id']);
    $pollingUnit = PollingUnit::query()->findOrFail($selection['polling_unit_id']);

    $this->getJson("/locations/states/{$selection['state_id']}/local-governments")
        ->assertOk()
        ->assertJsonFragment(['id' => $localGovernment->id, 'name' => $localGovernment->name]);
    $this->getJson("/locations/local-governments/{$localGovernment->id}/wards")
        ->assertOk()
        ->assertJsonFragment(['id' => $ward->id, 'name' => $ward->name]);
    $this->getJson("/locations/wards/{$ward->id}/polling-units")
        ->assertOk()
        ->assertJsonFragment(['id' => $pollingUnit->id, 'name' => $pollingUnit->name]);
});

test('invalid Nigerian phone numbers cannot register', function () {
    $this->post('/register/member', [
        'full_name' => 'Ada Okafor',
        'vin' => 'AB12345689',
        'phone_number' => '12345',
        ...memberLocationSelection(),
        'privacy_consent' => '1',
    ])->assertSessionHasErrors('phone_number');

    $this->assertDatabaseCount('members', 0);
});

test('member identity values are encrypted and phone lookup handles local format', function () {
    $this->post('/register/member', [
        'full_name' => 'Ada Okafor',
        'vin' => 'AB12345680',
        'phone_number' => '08031234567',
        ...memberLocationSelection(),
        'privacy_consent' => '1',
    ]);

    $member = Member::query()->firstOrFail();

    expect($member->getRawOriginal('vin'))->not->toBe('AB12345680')
        ->and($member->getRawOriginal('phone_number'))->not->toBe('+2348031234567')
        ->and(Member::hashPhone('08031234567'))->toBe(Member::hashPhone('+2348031234567'));
});

test('admin users can sign in to the dashboard', function () {
    User::factory()->create([
        'name' => 'Super Admin',
        'email' => 'admin@ancy.org',
        'password' => Hash::make('StrongPass!123'),
        'role' => 'super_admin',
        'status' => 'active',
    ]);

    $response = $this->post('/admin/login', [
        'email' => 'admin@ancy.org',
        'password' => 'StrongPass!123',
    ]);

    $response->assertRedirect('/admin');
    $this->assertAuthenticated();
});

test('admin dashboard sends empty filters as an object', function () {
    $admin = User::factory()->create(['role' => 'records_admin']);
    $this->actingAs($admin);

    $response = $this->get('/admin');

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/dashboard'));

    expect($response->viewData('page')['props']['filters'])->toBeObject();
});

test('admin dashboard filters by location and reports real totals', function () {
    $admin = User::factory()->create(['role' => 'records_admin']);
    $this->actingAs($admin);

    Member::query()->create([
        'full_name' => 'Ada Okafor',
        'vin' => 'AB12345681',
        'phone_number' => '+2348031234567',
        'state' => 'Kogi',
        'lga' => 'Lokoja',
        'ward' => 'Kabawa',
        'polling_unit' => 'PU 12',
        'privacy_consent_at' => now(),
        'status' => 'pending',
    ]);
    Member::query()->create([
        'full_name' => 'Bola Bello',
        'vin' => 'AB12345682',
        'phone_number' => '+2348031234568',
        'state' => 'Benue',
        'lga' => 'Makurdi',
        'ward' => 'Modern Market',
        'polling_unit' => 'PU 03',
        'privacy_consent_at' => now(),
        'status' => 'approved',
    ]);

    $this->get('/admin?state=Kogi&lga=Lokoja&status=pending')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/dashboard')
            ->where('stats.total', 2)
            ->where('stats.pending', 1)
            ->has('stats.by_state', 2)
            ->has('stats.by_lga', 2)
            ->has('members.data', 1)
            ->where('members.data.0.full_name', 'Ada Okafor')
        );
});

test('database seeding does not create a default administrator', function () {
    Artisan::call('db:seed');

    expect(User::query()->count())->toBe(0);
});

test('admin seeder creates an active verified administrator from configured credentials', function () {
    config([
        'admin_seed.name' => 'ANCY Owner',
        'admin_seed.email' => 'owner@example.org',
        'admin_seed.password' => 'SecureAdmin!2026-ANCY',
        'admin_seed.role' => 'super_admin',
    ]);

    $this->seed(AdminUserSeeder::class);

    $admin = User::query()->where('email', 'owner@example.org')->firstOrFail();
    expect($admin->name)->toBe('ANCY Owner')
        ->and($admin->role)->toBe('super_admin')
        ->and($admin->status)->toBe('active')
        ->and($admin->email_verified_at)->not->toBeNull()
        ->and(Hash::check('SecureAdmin!2026-ANCY', $admin->password))->toBeTrue();
});

test('admin seeder fails when secure credentials are not configured', function () {
    config([
        'admin_seed.name' => null,
        'admin_seed.email' => null,
        'admin_seed.password' => null,
        'admin_seed.role' => 'super_admin',
    ]);

    expect(fn () => $this->seed(AdminUserSeeder::class))
        ->toThrow(RuntimeException::class, 'Admin seed configuration is invalid');

    expect(User::query()->count())->toBe(0);
});

test('location catalog seeding imports only ANCY coverage and is idempotent', function () {
    expect(LocationState::query()->count())->toBe(7)
        ->and(LocalGovernment::query()->count())->toBe(121)
        ->and(LocationWard::query()->count())->toBe(1398)
        ->and(PollingUnit::query()->count())->toBe(15598);

    $this->seed(LocationCatalogSeeder::class);

    expect(LocationState::query()->count())->toBe(7)
        ->and(LocalGovernment::query()->count())->toBe(121)
        ->and(LocationWard::query()->count())->toBe(1398)
        ->and(PollingUnit::query()->count())->toBe(15598);
});

test('first administrator setup prompts for a private strong password', function () {
    $password = 'SecureAdmin!2026-ANCY';

    $this->artisan('ancy:make-admin', [
        'email' => 'owner@example.org',
        'name' => 'ANCY Owner',
    ])
        ->expectsQuestion('Admin password', $password)
        ->expectsQuestion('Confirm admin password', $password)
        ->expectsOutput('Admin account ready.')
        ->doesntExpectOutput($password)
        ->assertExitCode(0);

    $user = User::query()->where('email', 'owner@example.org')->firstOrFail();
    expect(Hash::check($password, $user->password))->toBeTrue()
        ->and($user->role)->toBe('super_admin');
});

test('contact messages are saved and administrators can manage their status', function () {
    $this->post('/contact', [
        'name' => 'Ada Okafor',
        'email' => 'ADA@example.org',
        'subject' => 'Membership question',
        'message' => 'Please tell me how to update my application.',
    ])->assertRedirect();

    $message = ContactMessage::query()->firstOrFail();
    expect($message->email)->toBe('ada@example.org')
        ->and($message->status)->toBe('new');

    $admin = User::factory()->create(['role' => 'records_admin']);
    $this->actingAs($admin)
        ->get('/admin/messages')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/messages')->has('messages.data', 1));

    $this->post("/admin/messages/{$message->id}/status", ['status' => 'resolved'])
        ->assertSessionHasNoErrors();
    expect($message->fresh()->status)->toBe('resolved');
});

test('only super admins can access and update public website settings', function () {
    $recordsAdmin = User::factory()->create(['role' => 'records_admin']);
    $this->actingAs($recordsAdmin)->get('/admin/settings')->assertForbidden();

    $superAdmin = User::factory()->create(['role' => 'super_admin']);
    $this->actingAs($superAdmin)->get('/admin/settings')->assertOk();

    $this->post('/admin/settings', [
        'organization_name' => 'ANCY',
        'about_us' => 'Updated organization background.',
        'vision' => 'A shared vision.',
        'mission' => 'A shared mission.',
        'core_values' => "Unity\nIntegrity",
        'objectives' => "Youth empowerment\nPeacebuilding",
        'programs' => "Mentorship\nDigital skills",
        'privacy_notice' => 'Updated privacy information.',
        'member_retention_days' => 0,
        'contact_message_retention_days' => 0,
        'contact_email' => '',
        'contact_phone' => '',
        'contact_address' => '',
        'facebook_url' => '',
        'x_url' => '',
        'instagram_url' => '',
        'linkedin_url' => '',
    ])->assertSessionHasNoErrors();

    expect(SiteSetting::value('about_us'))->toBe('Updated organization background.')
        ->and(json_decode(SiteSetting::value('core_values'), true))->toBe(['Unity', 'Integrity']);
});

test('admins can correct member details and the audit log omits sensitive values', function () {
    $admin = User::factory()->create(['role' => 'records_admin']);
    $member = Member::query()->create([
        'full_name' => 'Ada Okafor',
        'vin' => 'AB12345683',
        'phone_number' => '+2348031234567',
        'state' => 'Kogi',
        'lga' => 'Lokoja',
        'ward' => 'Kabawa',
        'polling_unit' => 'PU 12',
        'privacy_consent_at' => now(),
        'status' => 'pending',
    ]);

    $this->actingAs($admin)->patch("/admin/members/{$member->id}", [
        'full_name' => 'Ada Okafor Updated',
        'vin' => 'AB12345684',
        'phone_number' => '08031234568',
        ...memberLocationSelection(),
    ])->assertSessionHasNoErrors();

    expect($member->fresh()->full_name)->toBe('Ada Okafor Updated')
        ->and($member->fresh()->vin)->toBe('AB12345684')
        ->and($member->fresh()->phone_number)->toBe('+2348031234568');

    $auditLog = AuditLog::query()->where('action', 'member_record_updated')->firstOrFail();
    expect($auditLog->details['fields'])->toContain('vin', 'phone_number', 'ward')
        ->and(json_encode($auditLog->details))->not->toContain('AB12345684', '+2348031234568');
});

test('CSV export includes VIN and audit metadata excludes sensitive values', function () {
    $admin = User::factory()->create(['role' => 'records_admin']);
    Member::query()->create([
        'full_name' => '=HYPERLINK("https://example.invalid")',
        'vin' => 'AB12345687',
        'phone_number' => '+2348031234567',
        'state' => 'Kogi',
        'lga' => 'Lokoja',
        'ward' => 'Kabawa',
        'polling_unit' => 'PU 12',
        'privacy_consent_at' => now(),
        'status' => 'pending',
    ]);

    $response = $this->actingAs($admin)->get('/admin/export?search=AB12345687');
    $response->assertOk();
    $csv = $response->streamedContent();
    expect($csv)->toContain("'=HYPERLINK")
        ->and($csv)->toContain('VIN', 'AB12345687')
        ->and($csv)->not->toContain('+2348031234567');

    $auditLog = AuditLog::query()->where('action', 'member_exported')->firstOrFail();
    expect($auditLog->details['includes_sensitive_fields'])->toBeTrue()
        ->and(json_encode($auditLog->details))->not->toContain('AB12345687');
});

test('admin login is rate limited and public responses include security headers', function () {
    for ($attempt = 0; $attempt < 5; $attempt++) {
        $this->post('/admin/login', ['email' => 'invalid@example.org', 'password' => 'incorrect']);
    }

    $this->post('/admin/login', ['email' => 'invalid@example.org', 'password' => 'incorrect'])
        ->assertTooManyRequests();

    $this->get('/')->assertHeader('X-Content-Type-Options', 'nosniff')
        ->assertHeader('X-Frame-Options', 'DENY');
});

test('configured retention deletes only expired data and records aggregate audit counts', function () {
    SiteSetting::query()->updateOrCreate(['key' => 'member_retention_days'], ['value' => '30']);
    SiteSetting::query()->updateOrCreate(['key' => 'contact_message_retention_days'], ['value' => '30']);

    $expiredMember = Member::query()->create([
        'full_name' => 'Expired Member',
        'vin' => 'AB12345685',
        'phone_number' => '+2348031234567',
        'state' => 'Kogi',
        'lga' => 'Lokoja',
        'ward' => 'Kabawa',
        'polling_unit' => 'PU 12',
        'privacy_consent_at' => now()->subDays(45),
    ]);
    $expiredMember->forceFill(['created_at' => now()->subDays(45), 'updated_at' => now()->subDays(45)])->saveQuietly();

    $expiredMessage = ContactMessage::query()->create([
        'name' => 'Old Sender',
        'email' => 'old@example.org',
        'subject' => 'Old message',
        'message' => 'No longer needed.',
        'status' => 'resolved',
    ]);
    $expiredMessage->forceFill(['created_at' => now()->subDays(45), 'updated_at' => now()->subDays(45)])->saveQuietly();

    Artisan::call('ancy:purge-expired-data');

    $this->assertDatabaseMissing('members', ['id' => $expiredMember->id]);
    $this->assertDatabaseMissing('contact_messages', ['id' => $expiredMessage->id]);
    $auditLog = AuditLog::query()->where('action', 'retention_purge_completed')->firstOrFail();
    expect($auditLog->details)->toBe(['members' => 1, 'contact_messages' => 1]);
});

test('retention is disabled by default', function () {
    Member::query()->create([
        'full_name' => 'Retained Member',
        'vin' => 'AB12345686',
        'phone_number' => '+2348031234567',
        'state' => 'Kogi',
        'lga' => 'Lokoja',
        'ward' => 'Kabawa',
        'polling_unit' => 'PU 12',
        'privacy_consent_at' => now()->subYears(10),
    ]);
    Member::query()->firstOrFail()->forceFill(['created_at' => now()->subYears(10)])->saveQuietly();

    Artisan::call('ancy:purge-expired-data');

    expect(Member::query()->count())->toBe(1);
});
