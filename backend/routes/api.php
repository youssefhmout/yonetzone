<?php

use App\Http\Controllers\Auth\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController ;
use App\Http\Controllers\AbonnementsController ;
use Illuminate\Container\Attributes\Auth;

Route::post('/agent/ajouter' , [UserController::class,'Store' ]) ;

Route::post('/connexion' , [UserController::class,'Login' ]);
Route::post('/agent/ajouterclient' , [ClientController::class,'Store' ])->middleware('auth:sanctum') ;
Route::get('/agent/clients' , [ClientController::class,'clientsByUser' ])->middleware('auth:sanctum') ;

Route::get('/agent/client/{id}' , [ClientController::class,'getClientById' ])->middleware('auth:sanctum') ;

Route::put('/agent/client/modifier/{id}' , [ClientController::class,'Update' ])->middleware('auth:sanctum') ;


Route::delete('/agent/client/supprimer/{id}' , [ClientController::class,'delete' ])->middleware('auth:sanctum') ;

  /////////////////////////////////////////////////////
 ///   les routes pour les services et abonnements ///
/////////////////////////////////////////////////////
Route::post('/agent/ajouterservice' , [AbonnementsController::class,'Storeservice' ])->middleware('auth:sanctum') ;


Route::post('/agent/ajouterabonnement' , [AbonnementsController::class,'Storeabonnement' ])->middleware('auth:sanctum') ;



Route::get('/agent/abonnements' , [AbonnementsController::class,'abonnementsByUser' ])->middleware('auth:sanctum') ;
Route::post('/agent/abonnement/renouveler' , [AbonnementsController::class,'renouveler' ])->middleware('auth:sanctum') ;

Route::post('/agent/abonnements/client' , action: [AbonnementsController::class,'getAbonnementsclient' ])->middleware('auth:sanctum') ;

//benefices

Route::get('/agent/benefices' , [AbonnementsController::class, 'benefices'])->middleware('auth:sanctum') ;