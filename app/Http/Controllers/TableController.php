<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\Order;
use App\Models\Table;
use App\Models\Product;
use App\Models\Employee;
use DB;

class TableController extends Controller
{
    public function index(Request $request) {
        $tables = Table::all();

        return response()->json($tables);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate(['number' => 'required']);

        $table = Table::create([
            'number' => $validatedData['number']
        ]);

        return response()->json($table);
    }

    public function update(Request $request) {
        $table = Table::find($request->id);
        $validatedData = $request->validate(['table_id' => '', 'employee_id' => '', 'products' => '', 'status' => '']);

        if(isset($validatedData['table_id'])) {
            $table->table_id = $validatedData['table_id'];
        } 
        
        if(isset($validatedData['employee_id'])) {
            $table->employee_id = $validatedData['employee_id'];
        }
        
        if(isset($validatedData['status'])) {
            $table->status = $validatedData['status'];
        }

        $table->save();

        if(isset($validatedData['products'])) {
            $table->products()->detach();

            foreach($validatedData['products'] as $prod) {
                if(isset($prod['id'])) {
                    $product = Product::find($prod['id']);
                }
                $quantity = $prod['quantity'];

                if(isset($product)) {
                    $table->products()->attach($product, ['quantity' => $quantity]);
                    $table->products()->updateExistingPivot(
                                $product,
                                ['quantity' => $quantity]
                            );
                }
            }
        }

        return response()->json($table);
    }

    public function delete(Request $request) {
        $product = Table::find($request->id);
        $product->delete();

        return response()->json($product); 
    }
}
