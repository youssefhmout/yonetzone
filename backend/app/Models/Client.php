<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nom_complet',
        'nom_societe',
        'email',
        'telephone',
        'date_debut',
        'date_fin',
        'type_abonnement',
        'duree',
        'prix',
        'prix_suivant',
    ];
}
