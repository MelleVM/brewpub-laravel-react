<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'api'], function () {
    Route::get('products', 'App\Http\Controllers\ProductController@index')->name('products');

    // orders routes

    Route::get('orders', 'App\Http\Controllers\OrderController@index')->name('orders');
    Route::delete('orders/{id}', 'App\Http\Controllers\OrderController@delete')->name('orders.delete');
    Route::post('orders', 'App\Http\Controllers\OrderController@store')->name('orders.create');
    Route::put('orders/{id}', 'App\Http\Controllers\OrderController@update')->name('products.update');
    
    // tables routes

    Route::get('tables', 'App\Http\Controllers\TableController@index')->name('tables');
    Route::post('tables', 'App\Http\Controllers\TableController@store')->name('tables.create');
});