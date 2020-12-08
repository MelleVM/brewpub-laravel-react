<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Table;
use App\Models\Product;
use App\Models\Employee;
use DB;

class OrderController extends Controller
{
    public function index(Request $request) {
        $orders = Order::with(['table', 'employee', 'products'])->get();

        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate(['table_id' => 'required', 'employee_id' => '', 'products' => 'required']);

        $order = new Order();

        if(isset($validatedData['table_id'])) {
            $order->table_id = $validatedData['table_id'];
        }


        if(isset($validatedData['employee_id'])) {
            $order->employee_id = $validatedData['employee_id'];
        } else {
            $order->employee_id = null;
        }

        $order->save();

        if(isset($validatedData['products'])) {
            foreach($validatedData['products'] as $prod) {
                if(isset($prod['id'])) {
                    $product = Product::find($prod['id']);
                }
                $quantity = $prod['quantity'];

                if(isset($product)) {
                    $order->products()->attach($product, ['quantity' => $quantity]);
                }
            }
        }

        return response()->json($order);
    }

    public function update(Request $request) {
        $order = Order::find($request->id);
        $validatedData = $request->validate(['table_id' => '', 'employee_id' => '', 'products' => '', 'status' => '']);

        if(isset($validatedData['table_id'])) {
            $order->table_id = $validatedData['table_id'];
        } 
        
        if(isset($validatedData['employee_id'])) {
            $order->employee_id = $validatedData['employee_id'];
        }
        
        if(isset($validatedData['status'])) {
            $order->status = $validatedData['status'];
        }

        $order->save();

        if(isset($validatedData['products'])) {
            $order->products()->detach();

            foreach($validatedData['products'] as $prod) {
                if(isset($prod['id'])) {
                    $product = Product::find($prod['id']);
                }
                $quantity = $prod['quantity'];

                if(isset($product)) {
                    $order->products()->attach($product, ['quantity' => $quantity]);
                    $order->products()->updateExistingPivot(
                                $product,
                                ['quantity' => $quantity]
                            );
                }
            }
        }

        return response()->json($order);
    }

    public function delete(Request $request) {
        $product = Order::find($request->id);
        $product->delete();

        return response()->json($product); 
    }
}
