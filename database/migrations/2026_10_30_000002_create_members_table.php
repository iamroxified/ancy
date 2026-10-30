<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('membership_number')->unique();
            $table->string('full_name');
            $table->text('vin');
            $table->string('vin_lookup_hash')->unique();
            $table->text('phone_number');
            $table->string('phone_lookup_hash')->index();
            $table->string('state');
            $table->string('lga');
            $table->string('ward');
            $table->string('polling_unit');
            $table->timestamp('privacy_consent_at')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();

            $table->index(['state', 'status']);
            $table->index(['created_at', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
