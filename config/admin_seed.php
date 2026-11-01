<?php

return [
    'name' => env('ADMIN_SEED_NAME'),
    'email' => env('ADMIN_SEED_EMAIL'),
    'password' => env('ADMIN_SEED_PASSWORD'),
    'role' => env('ADMIN_SEED_ROLE', 'super_admin'),
];
