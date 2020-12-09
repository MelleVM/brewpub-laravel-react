<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\RoleProduct;
use App\Models\Table;
use App\Models\Product;
use DB;

class RoleController extends Controller
{
    
    public function store(Request $request)
    {
        $validatedData = $request->validate(['title' => 'required']);

        $role = new Role();

        if(isset($validatedData['title'])) {
            $role->title = $validatedData['title'];
        }

        $role->save();

        return response()->json($role);
    }
}
