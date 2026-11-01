<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class MakeAdminCommand extends Command
{
    protected $signature = 'ancy:make-admin {email} {name} {--role=super_admin}';

    protected $description = 'Create or update an ANCY admin account.';

    public function handle(): int
    {
        $email = $this->argument('email');
        $name = $this->argument('name');
        $role = $this->option('role');

        if (! filter_var($email, FILTER_VALIDATE_EMAIL) || trim($name) === '') {
            $this->error('Provide a valid email address and a non-empty name.');

            return self::FAILURE;
        }

        if (! in_array($role, ['super_admin', 'records_admin'], true)) {
            $this->error('Role must be super_admin or records_admin.');

            return self::FAILURE;
        }

        $password = $this->secret('Admin password');
        $confirmation = $this->secret('Confirm admin password');

        if (! is_string($password) || $password === '' || $password !== $confirmation) {
            $this->error('The password is required and both entries must match.');

            return self::FAILURE;
        }

        $validator = Validator::make(['password' => $password], [
            'password' => [Password::min(12)->mixedCase()->letters()->numbers()->symbols()],
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }

            return self::FAILURE;
        }

        $user = User::query()->updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => $password,
                'role' => $role,
                'status' => 'active',
            ]
        );

        $user->markEmailAsVerified();

        $this->info('Admin account ready.');
        $this->line('Email: '.$user->email);
        $this->line('Role: '.$user->role);

        return self::SUCCESS;
    }
}
