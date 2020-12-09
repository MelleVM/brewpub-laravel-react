<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\EmployeeProduct;
use App\Models\Table;
use App\Models\Product;
use App\Models\Employee;
use DB;

class EmployeeController extends Controller
{
    
    public function store(Request $request)
    {
        $validatedData = $request->validate(['name' => 'required', 'role_id' => 'required']);

        $employee = new Employee();

        if(isset($validatedData['name'])) {
            $employee->name = $validatedData['name'];
        }

        if(isset($validatedData['role_id'])) {
            $employee->role_id = $validatedData['role_id'];
        }

        $employee->save();

        return response()->json($employee);
    }
}
