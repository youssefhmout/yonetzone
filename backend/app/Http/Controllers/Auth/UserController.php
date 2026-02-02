<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function Store(Request $request){
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if (Auth::user()->role !='admin'){
            return response()->json(['message'=>'unauthorized']) ;
        }
        $existingAdmin = User::where('email', $request->email)->first();
        if($existingAdmin){
            return response()->json(['message' =>'Email already exists' ]) ;
        }
        $user =User::create([
            'name'=>$request->name ,
            'email'=>$request->email ,
            'password'=>$request->password
        ]);
        return response()->json(['message' =>'user added' , 'data'=>$user] , 200) ;
    }
    public function login(Request $request){
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();
    if(!$user){
        return response()->json(['message' => 'Email incorrect'], 404);
    }

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Password incorrect'], 401);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Login successful',
        'data' => $user,
        'access_token' => $token,
        'token_type' => 'Bearer'
    ], 200);
}

    function getAgents (Request $request){
        if (Auth::user()->role !='admin'){
            return response()->json(['message'=>'unauthorized']) ;
        }
        $users = User::where('role', 'agent')
                    ->select('id','name','email','created_at')
                    ->get();

        return response()->json(['agents' => $users]);

    }

    function  getrole (Request $request){

        $user= User::where('id', Auth::id())
        ->select('role' , 'name')
        ->first();

        return response()->json($user);
    }


    public function modifieruser(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'unauthorized'], 403);
        }

        $request->validate([
            'id'    => 'required|exists:users,id',
            'name'  => 'required|string',
            'email' => 'required|email',
            'password' => 'nullable|min:6',
        ]);

        $user = User::find($request->id);

        if (!$user) {
            return response()->json(['message' => "agent n'existe pas"], 404);
        }

        $data = $request->only(['name', 'email']);

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return response()->json([
            'message' => 'agent est modifié avec succès'
        ], 200);
    }
    function supprimeruser($id)
    {
        $userId = Auth::id();
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $user = User::where('id', $id)->first();

        if (!$user) {
            return response()->json([
                'message' => 'agent not found'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'agent deleted successfully'
        ], 200);
    }

}
