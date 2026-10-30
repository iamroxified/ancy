<?php

use App\Models\User;
use App\Models\Member;
use App\Models\ContactMessage;
use App\Models\SiteSetting;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;

uses(WithFaker::class);

test('a visitor can register a member with valid data', function () {
    $response = $this->post('/register/member', [
        'full_name' => 'Ada Okafor',
        'vin' => 'AB12345678',
        'phone_number' => '08031234567',
        'state' => 'Kogi',
        'lga' => 'Lokoja',
        'ward' => 'Kabawa',
        'polling_unit' => 'PU 12',
        'privacy_consent' => '1',
    ]);

    $response->assertRedirect('/register/confirmation');
    $this->assertDatabaseHas('members', [
        'full_name' => 'Ada Okafor',
        'state' => 'Kogi',
    ]);
});

test('duplicate VIN registrations are rejected', function () {
    $this->post('/register/member', [
        'full_name' => 'Ada Okafor',
        'vin' => 'AB12345678',
        'phone_number' => '08031234567',
        'state' => 'Kogi',
        'lga' => 'Lokoja',
        'ward' => 'Kabawa',
        'polling_unit' => 'PU 12',
        'privacy_consent' => '1',
    ]);

    $response = $this->post('/register/member', [
        'full_name' => 'Ada Okafor Two',
        'vin' => 'AB12345678',
        'phone_number' => '08031234568',
        'state' => 'Benue',
        'lga' => 'Makurdi',
        'ward' => 'Modern Market',
        'polling_unit' => 'PU 03',
        'privacy_consent' => '1',
    ]);

    $response->assertSessionHasErrors('vin');
});

test('a state cannot be paired with an LGA from another state', function () {
    $response = $this->post('/register/member', [
        'full_name' => 'Ada Okafor',
        'vin' => 'AB12345679',
        'phone_number' => '08031234567',
        'state' => 'Kogi',
        'lga' => 'Makurdi',
        'ward' => 'Test Ward',
        'polling_unit' => 'PU 12',
        'privacy_consent' => '1',
    ]);

    $response->assertSessionHasErrors('lga');
    $this->assertDatabaseCount('members', 0);
});

test('member identity values are encrypted and phone lookup handles local format', function () {
    $this->post('/register/member', [
        'full_name' => 'Ada Okafor',
        'vin' => 'AB12345680',
        'phone_number' => '08031234567',
        'state' => 'Kogi',
        'lga' => 'Lokoja',
        'ward' => 'Kabawa',
        'polling_unit' => 'PU 12',
        'privacy_consent' => '1',
    ]);

    $member = \App\Models\Member::query()->firstOrFail();

    expect($member->getRawOriginal('vin'))->not->toBe('AB12345680')
        ->and($member->getRawOriginal('phone_number'))->not->toBe('+2348031234567')
        ->and(\App\Models\Member::hashPhone('08031234567'))->toBe(\App\Models\Member::hashPhone('+2348031234567'));
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

test('first administrator setup prompts for a private strong password', function () {
    $password = 'SecureAdmin!2026-ANCYN';

    $this->artisan('ancy:make-admin', [
        'email' => 'owner@example.org',
        'name' => 'ANCYN Owner',
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
        'organization_name' => 'ANCYN',
        'about_us' => 'Updated organization background.',
        'vision' => 'A shared vision.',
        'mission' => 'A shared mission.',
        'core_values' => "Unity\nIntegrity",
        'objectives' => "Youth empowerment\nPeacebuilding",
        'programs' => "Mentorship\nDigital skills",
        'privacy_notice' => 'Updated privacy information.',
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
        'state' => 'Kogi',
        'lga' => 'Lokoja',
        'ward' => 'New Ward',
        'polling_unit' => 'PU 19',
    ])->assertSessionHasNoErrors();

    expect($member->fresh()->full_name)->toBe('Ada Okafor Updated')
        ->and($member->fresh()->vin)->toBe('AB12345684')
        ->and($member->fresh()->phone_number)->toBe('+2348031234568');

    $auditLog = \App\Models\AuditLog::query()->where('action', 'member_record_updated')->firstOrFail();
    expect($auditLog->details['fields'])->toContain('vin', 'phone_number', 'ward')
        ->and(json_encode($auditLog->details))->not->toContain('AB12345684', '+2348031234568');
});
