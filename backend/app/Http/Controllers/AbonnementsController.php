<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Abonnement;
use App\Models\Client;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class AbonnementsController extends Controller
{

// Ajouter un nouveau service
// ///////////////////////////////////////////////////////////////////////////////////////////////
    public function Storeservice(Request $request)
    {
        $request->validate([
            'client_id' => 'required|integer',
            'type' => 'required|string',
            'prix_initial' => 'required|numeric',
            'prix_renouvellement' => 'required|numeric',
        ]);

        $service = Service::create([
            'client_id' => $request->client_id,
            'user_id' => Auth::id(),
            'type' => $request->type,
            'prix_initial' => $request->prix_initial,
            'prix_renouvellement' => $request->prix_renouvellement,
        ]);

        return response()->json([
            'message' => 'Service created successfully',
            'service' => $service
        ], 201);
    }
// Ajouter un nouvel abonnement
// /////////////////////////////////////////////////////////////////////////////////////////////////
    public function Storeabonnement(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'client_id'  => 'required|exists:clients,id',
            'date_debut' => 'required|date',
            'duree' => 'required|integer',
            'ancien_abonnement_id' => 'nullable|integer',
        ]);


        $service = Service::find($request->service_id);
        $prix_unitaire = $service->prix_initial ;

        if ($service->type ==='mensuel') {
            $date_fin=Carbon::parse($request->date_debut)->addMonths($request->duree);
        }
        elseif ($service->type ==='annuel') {
            $date_fin=Carbon::parse($request->date_debut)->addYears($request->duree);
        }
        else {
            return response()->json([
                'message' => 'Type de service invalide'
            ], 400);
        }
        


        $abonnement = Abonnement::create([
            'service_id' => $request->service_id,
            'user_id' => Auth::id(),
            'client_id' => $request->client_id,
            'prix_unitaire' => $prix_unitaire,
            'date_debut' => $request->date_debut,
            'duree' => $request->duree,
            'date_fin' => $date_fin,
            'statut' => 'active',
            'ancien_abonnement_id' => $request->ancien_abonnement_id,
        ]);

        return response()->json([
            'message' => 'Abonnement created successfully',
            'abonnement' => $abonnement
        ], 201);
    }
// Récupérer les abonnements par utilisateur
// /////////////////////////////////////////////////////////////////////////////////////////////////
    public function abonnementsByUser()
    {
        $abonnements = Abonnement::with(['client', 'service'])
            ->where('user_id', Auth::id())
            ->get();

        return response()->json([
            'abonnements' => $abonnements
        ], 200);
    }

}