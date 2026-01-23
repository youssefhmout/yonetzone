<?php
namespace App\Http\Controllers;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB ;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class beneficesController extends Controller
{
    public function benefices(Request $request)
    {
        $userId = Auth::id();
        $userRole = Auth::user()->role;
        $currentYear = now()->year;
        $currentMonth = now()->month;

        /* 
        ========================
        💰 BENEFICES
        ========================
        */

        // أرباح الشهور للسنة الحالية
        $revenues = DB::table('abonnements')
            ->selectRaw('MONTH(created_at) as month, SUM(prix_unitaire) as total')
            ->when($userRole === 'agent', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->whereYear('created_at', $currentYear)
            ->groupByRaw('MONTH(created_at)')
            ->get()
            ->keyBy('month');

        // الربح الإجمالي
        $totalAllTime = DB::table('abonnements')
            ->when($userRole === 'agent', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->sum('prix_unitaire');

        // ربح السنة الحالية
        $totalYear = DB::table('abonnements')
            ->when($userRole === 'agent', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
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
            ->when($userRole === 'agent', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->count();

        // عدد زبناء السنة الحالية
        $clientsYear = DB::table('clients')
            ->when($userRole === 'agent', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->whereYear('created_at', $currentYear)
            ->count();

        // عدد الزبناء حسب الشهور
        $clientsByMonth = DB::table('clients')
            ->selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->when($userRole === 'agent', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
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
            ->when($userRole === 'agent', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->where('statut', 'active')
            ->count();

        // 2️⃣ 
        $abonnementsExpiredButActive = DB::table('abonnements')
            ->when($userRole === 'agent', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->where('statut', 'active')
            ->whereDate('date_fin', '<', $today)
            ->count();

        // 3️⃣
        $abonnementsExpiringSoon = DB::table('abonnements')
            ->when($userRole === 'agent', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
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
            'current_month' => $currentMonth ,
        ]);

    }
}
