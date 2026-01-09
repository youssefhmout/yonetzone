<?php

use App\Http\Controllers\Auth\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController ;
Route::post('/agent/ajouter' , [UserController::class,'Store' ]) ;
Route::post('/agent/connexion' , [UserController::class,'Login' ]);
Route::post('/agent/ajouterclient' , [ClientController::class,'Store' ]) ;