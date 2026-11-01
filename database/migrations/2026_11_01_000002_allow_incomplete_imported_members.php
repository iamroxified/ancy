<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('members', function (Blueprint $table) {
            $table->string('membership_number')->nullable()->change();
            $table->string('full_name')->nullable()->change();
            $table->text('vin')->nullable()->change();
            $table->string('vin_lookup_hash')->nullable()->change();
            $table->text('phone_number')->nullable()->change();
            $table->string('phone_lookup_hash')->nullable()->change();
            $table->string('state')->nullable()->change();
            $table->string('lga')->nullable()->change();
            $table->string('ward')->nullable()->change();
            $table->string('polling_unit')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {
            $table->string('membership_number')->nullable(false)->change();
            $table->string('full_name')->nullable(false)->change();
            $table->text('vin')->nullable(false)->change();
            $table->string('vin_lookup_hash')->nullable(false)->change();
            $table->text('phone_number')->nullable(false)->change();
            $table->string('phone_lookup_hash')->nullable(false)->change();
            $table->string('state')->nullable(false)->change();
            $table->string('lga')->nullable(false)->change();
            $table->string('ward')->nullable(false)->change();
            $table->string('polling_unit')->nullable(false)->change();
        });
    }
};
