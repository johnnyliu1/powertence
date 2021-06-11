<?php

use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\SetController;
use App\Http\Controllers\ProfileController;
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

Route::post('/register', [UserController::class, 'register']);

Route::get('/workouts', [WorkoutController::class, 'index']);
Route::get('/workouts/{id}', [WorkoutController::class, 'show']);
Route::get('/workouts/getAll/{id}', [WorkoutController::class, 'getAllWorkouts']);
Route::get('/workouts/all/{id}', [WorkoutController::class, 'getWorkouts']);
Route::post('/workouts/store', [WorkoutController::class, 'store']);
Route::put('/workouts/update/{id}', [WorkoutController::class, 'update']);
Route::put('/workouts/update/timer/{id}', [WorkoutController::class, 'updateTimer']);
Route::delete('/workouts/delete/{id}', [WorkoutController::class, 'destroy']);

Route::get('/exercises/{id}', [ExerciseController::class, 'getExercisesForWorkout']);
Route::get('/exercises/single/{id}', [ExerciseController::class, 'show']);
Route::post('/exercises/store', [ExerciseController::class, 'store']);
Route::put('/exercises/update/{id}', [ExerciseController::class, 'update']);
Route::delete('/exercises/delete/{id}', [ExerciseController::class, 'destroy']);


Route::get('/sets/{id}', [SetController::class, 'getAllSetsForExercise']);
Route::post('/sets/store', [SetController::class, 'store']);
Route::put('/sets/update/{id}', [SetController::class, 'update']);
Route::delete('/sets/delete/{id}', [SetController::class, 'destroy']);

Route::get('/profile/{id}', [ProfileController::class, 'index']);
Route::post('/profile/store', [ProfileController::class, 'store']);
Route::post('/profile/update/{id}', [ProfileController::class, 'update']);




Route::middleware('auth:sanctum')->get('/profile', [WorkoutController::class, 'index']);

/*
Route::middleware('auth:sanctum')->get('/profile', function (Request $request) {

    return $request->user();

});
 */
//URL::forceScheme('https');
