<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function register(Request $request): JsonResponse
    {

        return response()->json([
            'message' => 'Registration request received',
            'data' => $request->all(),
        ]);
    }
}
