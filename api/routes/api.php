<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

// registration route
Route::post('/register', [App\Http\Controllers\UsersController::class, 'register']);

// token-based login route
Route::post('/login', function (Request $request) {
    $validated = $request->validate([
        'email' => 'required|email|max:255',
        'password' => 'required|string|min:6',
    ]);

    $user = User::where('email', $validated['email'])->first();

    if (! $user || ! Hash::check($validated['password'], $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // creating Sanctum token
    $token = $user->createToken('auth_token')->plainTextToken;

    // return token and data about users
    return response()->json([
        'message' => 'Login successful',
        'token' => $token,
        'user' => $user,
    ]);
});

// Route for /me - return current logged in user
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return response()->json($request->user());
});

// Logout route - delete current token
Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Logged out']);
});
