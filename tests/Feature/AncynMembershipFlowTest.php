<?php

use App\Models\User;
use App\Models\Member;
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
