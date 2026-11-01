<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('site_settings')
            ->where('key', 'abbreviation')
            ->where('value', 'ANCYN')
            ->update(['value' => 'ANCY']);

        foreach (['about_us', 'privacy_notice'] as $key) {
            DB::table('site_settings')
                ->where('key', $key)
                ->where('value', 'like', '%ANCYN%')
                ->update(['value' => DB::raw("REPLACE(value, 'ANCYN', 'ANCY')")]);
        }
    }

    public function down(): void
    {
        DB::table('site_settings')
            ->where('key', 'abbreviation')
            ->where('value', 'ANCY')
            ->update(['value' => 'ANCYN']);

        foreach (['about_us', 'privacy_notice'] as $key) {
            DB::table('site_settings')
                ->where('key', $key)
                ->where('value', 'like', '%ANCY%')
                ->update(['value' => DB::raw("REPLACE(value, 'ANCY', 'ANCYN')")]);
        }
    }
};
