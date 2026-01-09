<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Carbon\Carbon;
class ClientController extends Controller
{
    public function Store(Request $request){
        $request->validate([
            'user_id' => 'required',
            'nom_complet' => 'required',
            'nom_societe' => 'required',
            'email' => 'required|email|unique:clients,email',
            'telephone' => 'required',
            'prix'=>'required|numeric',
            'prix_suivant'=>'required|numeric',
            'type_abonnement'=>'required',
            'duree'=>'required|integer',
            'date_debut'=>'required|date',
        ]);
        $existsclient = Client::where('email', $request->email)->first();
        if($existsclient){
            return response()->json(['message' => 'Client already exists'], 409);   
    }
            $date_debut = Carbon::parse($request->date_debut);

            if ($request->type_abonnement === 'mensuel') {
                $date_fin = $date_debut->copy()->addMonths((int) $request->duree);
            } else {
                $date_fin = $date_debut->copy()->addYears((int) $request->duree);
            }
        $client = Client::create([
            'user_id' => $request->user_id,
            'nom_complet' => $request->nom_complet,
            'nom_societe' => $request->nom_societe,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'date_debut' => $request->date_debut,
            'date_fin' => $date_fin,
            'type_abonnement' => $request->type_abonnement,
            'duree' => $request->duree,
            'prix' => $request->prix,
            'prix_suivant' => $request->prix_suivant,
        ]);
        return response()->json(['message' => 'Client created successfully', 'client' => $client], 201);
       }
}
