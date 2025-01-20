<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SessionController extends Controller
{
    /**
     * Display the current user.
     */
    public function show()
    {
        $user = request()->user();

        return $user;
    }
}
