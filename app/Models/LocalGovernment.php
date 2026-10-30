<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LocalGovernment extends Model
{
    protected $fillable = ['location_state_id', 'source_key', 'name'];

    public function state(): BelongsTo
    {
        return $this->belongsTo(LocationState::class, 'location_state_id');
    }

    public function wards(): HasMany
    {
        return $this->hasMany(LocationWard::class);
    }
}
