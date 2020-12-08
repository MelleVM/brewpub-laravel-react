<?php

use Illuminate\Support\Facades\Route;

Route::view('/{path?}', ['app']);
Route::view('/{path?}/{path2?}', ['app']);
Route::view('/{path?}/{path2?}/{path3?}', ['app']);
Route::view('/{path?}/{path2?}/{path3?}/{path4?}', ['app']);