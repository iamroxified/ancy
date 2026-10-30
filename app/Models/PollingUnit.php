<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PollingUnit extends Model
{
    protected $fillable = ['location_ward_id', 'source_key', 'name'];

    public function ward(): BelongsTo
    {
        return $this->belongsTo(LocationWard::class, 'location_ward_id');
    }
}
