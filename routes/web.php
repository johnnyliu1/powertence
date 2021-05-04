<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

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

Route::get('/signin', function () {
    return view('welcome');
})->name('signin');

Route::get('/register-user', function () {
    return view('welcome');
});
Route::get('/register', function () {
    return view('welcome');
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function () {
        return view('welcome');
    });
    Route::get('/workouts', function () {
        return view('welcome');
    });
    Route::get('/', function () {
        return view('welcome');
    });
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Auth::routes([
    'register' => false, // Registration Routes...
]);
