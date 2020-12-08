<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\Order;
use App\Models\Table;
use App\Models\Product;
use App\Models\Employee;
use DB;

class ProductController extends Controller
{
    public function index(Request $request) {
        $products = Product::all();

        return response()->json($products);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate(['table_id' => 'required', 'employee_id' => 'required', 'products' => 'required']);

        $product = Product::create([
            'table_id' => $validatedData['table_id'],
            'employee_id' => $validatedData['employee_id']
        ]);

        foreach($validatedData['products'] as $prod) {
            if(isset($prod['id'])) {
                $product = Product::find($prod['id']);
            }
            $quantity = $prod['quantity'];

            if(isset($product)) {
                $product->products()->attach($product, ['quantity' => $quantity]);
            }
        }

        return response()->json($product);
    }

    public function update(Request $request) {
        $product = Product::find($request->id);
        $validatedData = $request->validate(['table_id' => '', 'employee_id' => '', 'products' => '', 'status' => '']);

        if(isset($validatedData['table_id'])) {
            $product->table_id = $validatedData['table_id'];
        } 
        
        if(isset($validatedData['employee_id'])) {
            $product->employee_id = $validatedData['employee_id'];
        }
        
        if(isset($validatedData['status'])) {
            $product->status = $validatedData['status'];
        }

        $product->save();

        if(isset($validatedData['products'])) {
            $product->products()->detach();

            foreach($validatedData['products'] as $prod) {
                if(isset($prod['id'])) {
                    $product = Product::find($prod['id']);
                }
                $quantity = $prod['quantity'];

                if(isset($product)) {
                    $product->products()->attach($product, ['quantity' => $quantity]);
                    $product->products()->updateExistingPivot(
                                $product,
                                ['quantity' => $quantity]
                            );
                }
            }
        }

        return response()->json($product);
    }

    public function delete(Request $request) {
        $product = Product::find($request->id);
        $product->delete();

        return response()->json($product); 
    }
}
