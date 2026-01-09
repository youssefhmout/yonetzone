<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function Store(Request $request){
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);
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

}
