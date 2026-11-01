<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use RuntimeException;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $attributes = [
            'name' => trim((string) config('admin_seed.name')),
            'email' => strtolower(trim((string) config('admin_seed.email'))),
            'password' => config('admin_seed.password'),
            'role' => config('admin_seed.role'),
        ];

        $validator = Validator::make($attributes, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'string', Password::min(12)->mixedCase()->letters()->numbers()->symbols()],
            'role' => ['required', 'in:super_admin,records_admin'],
        ]);

        if ($validator->fails()) {
            throw new RuntimeException('Admin seed configuration is invalid: '.implode(' ', $validator->errors()->all()));
        }

        $existingUser = User::query()->where('email', $attributes['email'])->first();

        if ($existingUser) {
            if ($existingUser->role === $attributes['role'] && $existingUser->status === 'active') {
                $this->command?->warn('The configured admin account already exists; it was left unchanged.');

                return;
            }

            throw new RuntimeException('An account with the configured admin email already exists and was not changed.');
        }

        $user = User::query()->create([
            ...$attributes,
            'status' => 'active',
        ]);
        $user->markEmailAsVerified();

        $this->command?->info('Admin account created: '.$user->email);
    }
}
