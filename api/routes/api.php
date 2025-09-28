<?php

use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UsersController::class, 'register']);
