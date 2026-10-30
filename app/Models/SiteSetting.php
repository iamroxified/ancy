<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class SiteSetting extends Model
{
    protected $table = 'site_settings';

    public $timestamps = false;

    protected $fillable = ['key', 'value'];

    public static function value(string $key, mixed $default = null): mixed
    {
        $row = static::query()->where('key', $key)->first();

        return $row ? $row->value : $default;
    }

    public static function ensureDefaults(array $defaults = []): void
    {
        if (! Schema::hasTable('site_settings')) {
            return;
        }

        $values = array_merge([
            'organization_name' => config('ancyn.organization_name'),
            'abbreviation' => config('ancyn.abbreviation'),
            'about_us' => config('ancyn.default_about'),
            'vision' => config('ancyn.default_vision'),
            'mission' => config('ancyn.default_mission'),
            'core_values' => json_encode(config('ancyn.default_core_values')),
            'objectives' => json_encode(config('ancyn.default_objectives')),
            'programs' => json_encode(config('ancyn.default_programs')),
            'privacy_notice' => config('ancyn.default_privacy'),
            'member_retention_days' => config('ancyn.retention.member_days'),
            'contact_message_retention_days' => config('ancyn.retention.contact_message_days'),
            'contact_email' => config('ancyn.default_contact.email'),
            'contact_phone' => config('ancyn.default_contact.phone'),
            'contact_address' => config('ancyn.default_contact.address'),
            'facebook_url' => config('ancyn.default_contact.facebook'),
            'x_url' => config('ancyn.default_contact.x'),
            'instagram_url' => config('ancyn.default_contact.instagram'),
            'linkedin_url' => config('ancyn.default_contact.linkedin'),
        ], $defaults);

        foreach ($values as $key => $value) {
            static::query()->firstOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
