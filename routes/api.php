<?php

use App\Http\Controllers\WorkoutController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
   // return $request->user();
   return $request->user();
});

Route::get('/test', function() {
    return ['message' => 'hello'];
});

Route::get('/workouts', [WorkoutController::class, 'index']);

Route::middleware('auth:sanctum')->get('/profile', [WorkoutController::class, 'index']); 

/* 
Route::middleware('auth:sanctum')->get('/profile', function (Request $request) {

    return $request->user();

});
 */