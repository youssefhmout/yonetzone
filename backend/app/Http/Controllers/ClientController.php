<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ClientController extends Controller
{
    public function Store(Request $request)
    {
        $request->validate([
            'nom_complet' => 'required|string',
            'nom_societe' => 'required|string',
            'email' => 'required|email|unique:clients,email',
            'telephone' => 'required',
        ]);
        $client = Client::create([
            'user_id' => Auth::id(),
            'nom_complet' => $request->nom_complet,
            'nom_societe' => $request->nom_societe,
            'email' => $request->email,
            'telephone' => $request->telephone
        ]);

        return response()->json([
            'message' => 'Client created successfully',
            'client' => $client
        ], 201);
    }
    public function Update(Request $request, $id)
    {
        $request->validate([
            'nom_complet' => 'sometimes|required|string',
            'nom_societe' => 'sometimes|required|string',
            'email' => 'required|email|unique:clients,email,' . $id,
            'telephone' => 'sometimes|required',
        ]);

        $userId = Auth::id();
        $client = Client::where('id', $id)->where('user_id', $userId)->first();

        if (!$client) {
            return response()->json([
                'message' => 'Client not found'
            ], 404);
        }

        $client->update($request->only(['nom_complet', 'nom_societe', 'email', 'telephone']));

        return response()->json([
            'message' => 'Client updated successfully',
            'client' => $client
        ], 200);
    }
    public function delete($id)
    {
        $userId = Auth::id();
        $client = Client::where('id', $id)->where('user_id', $userId)->first();

        if (!$client) {
            return response()->json([
                'message' => 'Client not found'
            ], 404);
        }

        $client->delete();

        return response()->json([
            'message' => 'Client deleted successfully'
        ], 200);
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

    public function testtoken(Request $request)
    {
        return response()->json([
            'message' => 'Token is valid',
            'user' => $request->user()
        ], 200);
    }
}
