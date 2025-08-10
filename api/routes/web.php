<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/register', function () {
    return 'welcome';
});

Route::post('/register', function ($request) {
    return response()->json([
        'message' => 'Registration data received',
        'data' => $request->all()
    ]);
});

Route::get('/test-connection', function () {
    return response()->json([
        'message' => 'Connection successful!',
        'data' => request()->all(),
        'timestamp' => now()
    ]);
});