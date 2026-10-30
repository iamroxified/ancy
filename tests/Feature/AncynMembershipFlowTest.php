<?php

use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;

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
