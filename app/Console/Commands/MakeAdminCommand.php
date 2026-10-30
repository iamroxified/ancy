<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class MakeAdminCommand extends Command
{
    protected $signature = 'ancy:make-admin {email} {name} {--password=} {--role=super_admin}';

    protected $description = 'Create or update an ANCYN admin account.';

    public function handle(): int
    {
        $email = $this->argument('email');
        $name = $this->argument('name');
        $password = $this->option('password') ?: strval(random_int(100000, 999999));
        $role = $this->option('role');

        $user = User::query()->updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'role' => in_array($role, ['super_admin', 'records_admin'], true) ? $role : 'super_admin',
                'status' => 'active',
            ]
        );

        $user->markEmailAsVerified();

        $this->info('Admin account ready.');
        $this->line('Email: '.$user->email);
        $this->line('Password: '.$password);
        $this->line('Role: '.$user->role);

        return self::SUCCESS;
    }
}
