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
    public function index(Request $request) {
        $employees = Employee::with(['table', 'employee', 'products'])->get();

        return response()->json($employees);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate(['name' => 'required']);

        $employee = new Employee();

        if(isset($validatedData['name'])) {
            $employee->name = $validatedData['name'];
        }

        $employee->save();

        return response()->json($employee);
    }

    public function update(Request $request) {
        $employee = Employee::find($request->id);
        $validatedData = $request->validate(['table_id' => '', 'employee_id' => '', 'products' => '', 'status' => '']);

        if(isset($validatedData['table_id'])) {
            $employee->table_id = $validatedData['table_id'];
        } 
        
        if(isset($validatedData['employee_id'])) {
            $employee->employee_id = $validatedData['employee_id'];
        }
        
        if(isset($validatedData['status'])) {
            $employee->status = $validatedData['status'];
        }

        $employee->save();

        if(isset($validatedData['products'])) {
            $employee->products()->detach();

            foreach($validatedData['products'] as $prod) {
                if(isset($prod['id'])) {
                    $product = Product::find($prod['id']);
                }
                $quantity = $prod['quantity'];

                if(isset($product)) {
                    $employee->products()->attach($product, ['quantity' => $quantity]);
                    $employee->products()->updateExistingPivot(
                                $product,
                                ['quantity' => $quantity]
                            );
                }
            }
        }

        return response()->json($employee);
    }

    public function delete(Request $request) {
        $product = Employee::find($request->id);
        $product->delete();

        return response()->json($product); 
    }
}
