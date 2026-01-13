<?php

use App\Http\Controllers\Auth\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController ;
Route::post('/agent/ajouter' , [UserController::class,'Store' ]) ;
Route::post('/agent/connexion' , [UserController::class,'Login' ]);
Route::post('/agent/ajouterclient' , [ClientController::class,'Store' ])->middleware('auth:sanctum') ;
Route::get('/agent/clients' , [ClientController::class,'clientsByUser' ])->middleware('auth:sanctum') ;

Route::get('/agent/client/{id}' , [ClientController::class,'getClientById' ])->middleware('auth:sanctum') ;