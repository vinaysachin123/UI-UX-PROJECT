<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/products', [ProductController::class, 'index']);
Route::post('/api/products', [ProductController::class, 'store']);
Route::put('/api/products/{id}', [ProductController::class, 'update']);
