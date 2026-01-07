<?php

use App\Http\Controllers\Auth\UserController;
use Illuminate\Support\Facades\Route;
Route::post('/agent/ajouter' , [UserController::class,'Store' ]) ;
Route::post('/agent/connexion' , [UserController::class,'Login' ]);
