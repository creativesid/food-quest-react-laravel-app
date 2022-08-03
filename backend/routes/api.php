<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::get('/categories', [UserController::class, 'allCategories']);
Route::get('/products', [UserController::class, 'allProducts']);
Route::get('/products/{id}', [UserController::class, 'allProducts']);
Route::get('/products/product/{id}', [UserController::class, 'singleProducts']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/order', [UserController::class, 'order']);
    Route::get('/orders', [UserController::class, 'allOrder']);
    Route::get('/orders/{id}', [UserController::class, 'allOrder']);
    Route::post('/address', [UserController::class, 'shippingaddress']);
    Route::get('/address', [UserController::class, 'getshippingaddress']);
    Route::delete('/address/{id}', [UserController::class, 'deleteshippingaddress']);
    Route::get('/profile', [UserController::class, 'profile']);
});

/*_______________ADMIN______________*/
// Route::post('/admin/register', [AdminController::class, 'register']);
Route::post('/admin/login', [AdminController::class, 'login']);

Route::post('/category', [AdminController::class, 'addCategory']);

Route::post('/product', [AdminController::class, 'addProduct']);
