<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Workout;
use Illuminate\Support\Facades\Auth;

class WorkoutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if(!$request->user()) {
            return response()->json(['error' => 'User does not exist'], 500);
        }

        //$myWorkouts = $request->user()->workouts;
        //$myWorkouts = Workout::paginate(5)->where('user_id', $request->user()->id);
        $myWorkouts = Workout::where('user_id', $request->user()->id)->paginate(3);
        return $myWorkouts;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newWorkout = new Workout();
        $newWorkout->name = $request->name;
        $newWorkout->user_id = $request->userId;
        $newWorkout->save();

        return $newWorkout;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $workout = Workout::find($request->workoutId);
        $workout->name = $request->name;
        $workout->update();
        return $request;
    }

    public function updateTimer(Request $request)
    {
        $workout = Workout::find($request->workoutId);
        $workout->stopTime = $request->stopTime;
        $workout->betweenTime = $request->betweenTime;
        $workout->update();
        return $request;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id = $request->id;
        $workout = Workout::where('id', $id);
        $workout->delete();
    }
}
