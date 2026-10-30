<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LocationWard extends Model
{
    protected $table = 'location_wards';

    protected $fillable = ['local_government_id', 'source_key', 'name'];

    public function localGovernment(): BelongsTo
    {
        return $this->belongsTo(LocalGovernment::class);
    }

    public function pollingUnits(): HasMany
    {
        return $this->hasMany(PollingUnit::class, 'location_ward_id');
    }
}
