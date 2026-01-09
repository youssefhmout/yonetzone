<?php 

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                  ->nullable()
                  ->constrained('users')
                  ->nullOnDelete();

            $table->string('nom_complet');
            $table->string('nom_societe')->nullable();
            $table->string('email')->nullable();
            $table->string('telephone')->nullable();
            $table->date('date_debut');
            $table->date('date_fin');
            $table->enum('type_abonnement', ['mensuel', 'annuel']);
            $table->integer('duree')->nullable();
            $table->decimal('prix' , 8, 2);
            $table->decimal('prix_suivant', 8, 2)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
