<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('location_states', function (Blueprint $table) {
            $table->id();
            $table->string('code', 60)->unique();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('local_governments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('location_state_id')->constrained()->cascadeOnDelete();
            $table->string('source_key', 150);
            $table->string('name', 180);
            $table->timestamps();
            $table->unique(['location_state_id', 'source_key']);
            $table->index(['location_state_id', 'name']);
        });

        Schema::create('location_wards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('local_government_id')->constrained()->cascadeOnDelete();
            $table->string('source_key', 180);
            $table->string('name', 200);
            $table->timestamps();
            $table->unique(['local_government_id', 'source_key']);
            $table->index(['local_government_id', 'name']);
        });

        Schema::create('polling_units', function (Blueprint $table) {
            $table->id();
            $table->foreignId('location_ward_id')->constrained()->cascadeOnDelete();
            $table->string('source_key', 255);
            $table->string('name', 255);
            $table->timestamps();
            $table->unique(['location_ward_id', 'source_key']);
            $table->index(['location_ward_id', 'name']);
        });

        Schema::table('members', function (Blueprint $table) {
            $table->foreignId('polling_unit_id')->nullable()->constrained()->nullOnDelete();
            $table->index('polling_unit_id');
        });
    }

    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {
            $table->dropConstrainedForeignId('polling_unit_id');
        });

        Schema::dropIfExists('polling_units');
        Schema::dropIfExists('location_wards');
        Schema::dropIfExists('local_governments');
        Schema::dropIfExists('location_states');
    }
};
