<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Abonnement extends Model
{
    use HasFactory;
    protected $fillable = [
        'service_id',
        'user_id',
        'client_id',
        'prix_unitaire',
        'date_debut',
        'duree',
        'date_fin',
        'statut',
        'ancien_abonnement_id',
    ];

    protected $casts = [
        'prix_unitaire' => 'float',
    ];
        public function client()
    {
        return $this->belongsTo(Client::class)->withTrashed();
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

}
