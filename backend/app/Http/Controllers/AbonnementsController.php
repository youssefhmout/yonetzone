<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Abonnement;
use App\Models\Client;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB ;
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
            ->where('statut', 'active')
            ->orderBy('service_id', 'desc')
            ->get();

        return response()->json([
            'abonnements' => $abonnements
        ], 200);
    }

// renouveler un abonnement
// /////////////////////////////////////////////////////////////////////////////////////////////////
    public function renouveler(Request $request)
    {
        $request->validate([
            'abonnement_id' => 'required|exists:abonnements,id',
            'duree' => 'required|integer',
        ]);

        $oldAbonnement = Abonnement::find($request->abonnement_id);

        $service = Service::find($oldAbonnement->service_id);
        $prix_unitaire = $service->prix_renouvellement ;

        if ($service->type ==='mensuel') {
            $date_debut = Carbon::parse($oldAbonnement->date_fin);
            $date_fin=Carbon::parse($date_debut)->addMonths($request->duree);
        }
        elseif ($service->type ==='annuel') {
            $date_debut = Carbon::parse($oldAbonnement->date_fin);
            $date_fin=Carbon::parse($date_debut)->addYears($request->duree);
        }
        else {
            return response()->json([
                'message' => 'Type de service invalide'
            ], 400);
        }

        $newAbonnement = Abonnement::create([
            'service_id' => $oldAbonnement->service_id,
            'user_id' => Auth::id(),
            'client_id' => $oldAbonnement->client_id,
            'prix_unitaire' => $prix_unitaire,
            'date_debut' => $date_debut,
            'duree' => $request->duree,
            'date_fin' => $date_fin,
            'statut' => 'active',
            'ancien_abonnement_id' => $oldAbonnement->id,
        ]);
        $oldAbonnement->statut = 'expired';
        $oldAbonnement->save();

        return response()->json([
            'message' => 'Abonnement renewed successfully',
            'abonnement' => $newAbonnement
        ], 201);
    }
    public function getAbonnementsclient(Request $request ){
        $request->validate([
            'client_id' => 'required|exists:clients,id',
            'service_id' => 'required|exists:services,id',
        ]);
        $userId = Auth::id();
        $abonnements = Abonnement::with(['client', 'service'])
            ->where('service_id', $request->service_id)
            ->where('client_id', $request->client_id)
            ->orderBy('date_debut', 'desc') ;



        return response()->json([
            'abonnements' => $abonnements->get()
        ], 200);

        
    
    }
///// bénéfices
//////////////////////////////////////////////////////////////
    public function benefices(Request $request)
    {
        $userId = Auth::id();
        $currentYear = now()->year;
        $currentMonth = now()->month;

        /* =======================
        💰 BENEFICES
        ======================= */

        // أرباح الشهور للسنة الحالية
        $revenues = DB::table('abonnements')
            ->selectRaw('MONTH(created_at) as month, SUM(prix_unitaire) as total')
            ->where('user_id', $userId)
            ->whereYear('created_at', $currentYear)
            ->groupByRaw('MONTH(created_at)')
            ->get()
            ->keyBy('month');

        // الربح الإجمالي
        $totalAllTime = DB::table('abonnements')
            ->where('user_id', $userId)
            ->sum('prix_unitaire');

        // ربح السنة الحالية
        $totalYear = DB::table('abonnements')
            ->where('user_id', $userId)
            ->whereYear('created_at', $currentYear)
            ->sum('prix_unitaire');

        $monthsRevenue = [];
        $totalMonth = 0;

        for ($i = 1; $i <= 12; $i++) {
            $monthTotal = $revenues[$i]->total ?? 0;

            if ($i === $currentMonth) {
                $totalMonth = $monthTotal;
            }

            $monthsRevenue[] = [
                'month' => $i,
                'total' => (float) $monthTotal
            ];
        }

        /* =======================
        👥 CLIENTS
        ======================= */

        // عدد الزبناء الإجمالي
        $clientsAllTime = DB::table('clients')
            ->where('user_id', $userId)
            ->count();

        // عدد زبناء السنة الحالية
        $clientsYear = DB::table('clients')
            ->where('user_id', $userId)
            ->whereYear('created_at', $currentYear)
            ->count();

        // عدد الزبناء حسب الشهور
        $clientsByMonth = DB::table('clients')
            ->selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->where('user_id', $userId)
            ->whereYear('created_at', $currentYear)
            ->groupByRaw('MONTH(created_at)')
            ->get()
            ->keyBy('month');

        $monthsClients = [];
        $clientsMonth = 0;

        for ($i = 1; $i <= 12; $i++) {
            $monthTotal = $clientsByMonth[$i]->total ?? 0;

            if ($i === $currentMonth) {
                $clientsMonth = $monthTotal;
            }

            $monthsClients[] = [
                'month' => $i,
                'total' => (int) $monthTotal
            ];
        }

        /* =======================
📅 ABONNEMENTS
======================= */

        $today = Carbon::today();
        $next7Days = Carbon::today()->addDays(7);

        // 1️⃣ 
        $abonnementsActive = DB::table('abonnements')
            ->where('user_id', $userId)
            ->where('statut', 'active')
            ->count();

        // 2️⃣ 
        $abonnementsExpiredButActive = DB::table('abonnements')
            ->where('user_id', $userId)
            ->where('statut', 'active')
            ->whereDate('date_fin', '<', $today)
            ->count();

        // 3️⃣
        $abonnementsExpiringSoon = DB::table('abonnements')
            ->where('user_id', $userId)
            ->where('statut', 'active')
            ->whereBetween('date_fin', [$today, $next7Days])
            ->count();

        /* =======================
        📦 RESPONSE
        ======================= */

        return response()->json([
            // BENEFICES
            'total_all_time' => (float) $totalAllTime,
            'total_year' => (float) $totalYear,
            'total_month' => (float) $totalMonth,
            'monthly_revenues' => $monthsRevenue,

            // CLIENTS
            'clients_all_time' => $clientsAllTime,
            'clients_year' => $clientsYear,
            'clients_month' => $clientsMonth,
            'monthly_clients' => $monthsClients,
            // ABONNEMENTS
            'abonnements_active' => $abonnementsActive,
            'abonnements_expired_active' => $abonnementsExpiredButActive,
            'abonnements_expiring_7_days' => $abonnementsExpiringSoon,

            'year' => $currentYear,
            'current_month' => $currentMonth
        ]);

    }

    
}