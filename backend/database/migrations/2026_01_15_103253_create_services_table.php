<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
            Schema::create('services', function (Blueprint $table) {
                $table->id();

                $table->foreignId('client_id')
                    ->nullable()
                    ->constrained('clients')
                    ->nullOnDelete();

                $table->foreignId('user_id')
                    ->nullable()
                    ->constrained('users')
                    ->nullOnDelete();

                $table->enum('type', allowed: ['mensuel', 'annuel']);
                $table->decimal('prix_initial', 10, 2);
                $table->decimal('prix_renouvellement', 10, 2);

                $table->timestamps();
            });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
