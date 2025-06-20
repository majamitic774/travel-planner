<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/message', function () {
    $text = 'Hello from Laravel';

    return response()->json(['message' => $text]);
});
