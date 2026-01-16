<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory ;
    protected $fillable = [
        'client_id',
        'user_id',
        'type',
        'prix_initial',
        'prix_renouvellement',
    ];
}
