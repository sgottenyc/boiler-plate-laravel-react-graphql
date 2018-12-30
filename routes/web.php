<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/* Wild card so all routes goes to app view template */
Route::view('/', 'login');

Route::view('/login', 'login');

Route::view('/home', 'home');

Route::view('/checkout', 'checkout');

Route::view('/dashboard', 'dashboard');

Route::view('/register', 'register');

