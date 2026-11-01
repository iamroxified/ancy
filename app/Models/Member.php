<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;

class Member extends Model
{
    protected $table = 'members';

    protected $fillable = [
        'membership_number',
        'full_name',
        'vin',
        'vin_lookup_hash',
        'phone_number',
        'phone_lookup_hash',
        'state',
        'lga',
        'ward',
        'polling_unit',
        'polling_unit_id',
        'privacy_consent_at',
        'status',
    ];

    protected $casts = [
        'privacy_consent_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $member) {
            if (! array_key_exists('membership_number', $member->getAttributes())) {
                $member->membership_number = self::generateMembershipNumber();
            }

            $member->status ??= 'pending';
        });

        static::saving(function (self $member) {
            $member->vin_lookup_hash = filled($member->vin) ? self::hashVin($member->vin) : null;
            $member->phone_lookup_hash = filled($member->phone_number) ? self::hashPhone($member->phone_number) : null;
        });
    }

    public static function states(): array
    {
        return config('ancyn.states', []);
    }

    public function pollingUnit(): BelongsTo
    {
        return $this->belongsTo(PollingUnit::class);
    }

    public static function generateMembershipNumber(): string
    {
        do {
            $number = 'ANCY-'.date('Y').'-'.strtoupper(Str::random(6));
        } while (self::query()->where('membership_number', $number)->exists());

        return $number;
    }

    public static function hashVin(string $vin): string
    {
        return hash_hmac('sha256', strtoupper(trim($vin)), config('app.key'));
    }

    public static function hashPhone(string $phone): string
    {
        $digits = preg_replace('/\D+/', '', self::normalizePhone($phone)) ?: '';

        return hash_hmac('sha256', $digits, config('app.key'));
    }

    public static function normalizePhone(string $phone): string
    {
        $digits = preg_replace('/\D+/', '', trim($phone));

        if ($digits === null || $digits === '') {
            return trim($phone);
        }

        if (str_starts_with($digits, '234')) {
            return '+'.$digits;
        }

        if (str_starts_with($digits, '0')) {
            return '+234'.substr($digits, 1);
        }

        return '+234'.$digits;
    }

    public function setVinAttribute(?string $value): void
    {
        $this->attributes['vin'] = filled($value) ? Crypt::encryptString($value) : null;
    }

    public function getVinAttribute(?string $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        return Crypt::decryptString($value);
    }

    public function setPhoneNumberAttribute(?string $value): void
    {
        $this->attributes['phone_number'] = filled($value) ? Crypt::encryptString($value) : null;
    }

    public function getPhoneNumberAttribute(?string $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        return Crypt::decryptString($value);
    }

    public function maskedVin(): string
    {
        $vin = strtoupper((string) $this->vin);

        if ($vin === '') {
            return 'Not provided';
        }

        if (strlen($vin) <= 6) {
            return '********';
        }

        return substr($vin, 0, 2).'********'.substr($vin, -2);
    }

    public function maskedPhone(): string
    {
        $phone = preg_replace('/\D+/', '', (string) $this->phone_number);

        if ($phone === '') {
            return 'Not provided';
        }

        if (strlen($phone) <= 4) {
            return '********';
        }

        return substr($phone, 0, 3).'******'.substr($phone, -2);
    }
}
