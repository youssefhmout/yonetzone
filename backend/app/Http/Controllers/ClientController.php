<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ClientController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nom_complet' => 'required|string',
            'nom_societe' => 'required|string',
            'email' => 'required|email|unique:clients,email',
            'telephone' => 'required',
            'prix' => 'required|numeric',
            'prix_suivant' => 'required|numeric',
            'type_abonnement' => 'required|in:mensuel,annuel',
            'duree' => 'required|integer|min:1',
            'date_debut' => 'required|date',
        ]);

        $date_debut = Carbon::parse($request->date_debut);

        $date_fin = $request->type_abonnement === 'mensuel'
            ? $date_debut->copy()->addMonths((int)$request->duree)
            : $date_debut->copy()->addYears((int)$request->duree);

        $client = Client::create([
            'user_id' => Auth::id(),
            'nom_complet' => $request->nom_complet,
            'nom_societe' => $request->nom_societe,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'date_debut' => $date_debut,
            'date_fin' => $date_fin,
            'type_abonnement' => $request->type_abonnement,
            'duree' => $request->duree,
            'prix' => $request->prix,
            'prix_suivant' => $request->prix_suivant,
        ]);

        return response()->json([
            'message' => 'Client created successfully',
            'client' => $client
        ], 201);
    }

    public function clientsByUser()
    {
        $userId = Auth::id();
        $clients = Client::where('user_id', $userId)->get();

        return response()->json([
            'message' => 'Clients retrieved successfully',
            'clients' => $clients
        ], 200);
    }
    public function getClientById($id)
    {
        $userId = Auth::id();
        $client = Client::where('id', $id)->where('user_id', $userId)->first();

        if (!$client) {
            return response()->json([
                'message' => 'Client not found'
            ], 404);
        }

        return response()->json([
            'message' => 'Client retrieved successfully',
            'client' => $client
        ], 200);
    }
}
