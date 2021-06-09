<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {

        $profile = Profile::where('user_id', $id)->get();

        return $profile;
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
        $user = User::findOrFail($request->userId);
        $profile = $user->profile ?: new Profile();
        $profile->user_id = $request->userId;
        $user->profile()->save($profile);

/*      $newProfile->birthDate = $request->birthDate;
        $newProfile->startWeight = $request->startWeight;
        $newProfile->goals = $request->goals;*/

        return $user;
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
    public function update(Request $request, $id)
    {
        if($request->hasFile('file')) {
            $request->validate([
                'file' => 'image|mimes:jpg,jpeg,png,gif,svg|max:4096'
            ]);
            //get filename with extension
            $filenameWithExt = $request->file('file')->getClientOriginalName();

            //Get just filename
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            //Get just extension
            $ext = $request->file('file')->getClientOriginalExtension();
            //Filename to store
            $fileNameToStore = $filename.'_'.time().'.'.$ext;

            //Upload Image
            $path = $request->file('file')->storeAs('public/profiles',$fileNameToStore);
            $profile = Profile::find($id);
            $profile->birthDate = $request->dateOfBirth;
            $profile->startWeight = $request->startWeight;
            $profile->currentWeight = $request->currentWeight;
            $profile->desiredWeight = $request->desiredWeight;
            $profile->goals = $request->goals;
            //$profile->file = $fileNameToStore;
            $profile->file = $fileNameToStore;
            $profile->update();
        } else {
            $profile = Profile::find($id);
            $profile->birthDate = $request->dateOfBirth;
            $profile->startWeight = $request->startWeight;
            $profile->currentWeight = $request->currentWeight;
            $profile->desiredWeight = $request->desiredWeight;
            $profile->goals = $request->goals;
            //$profile->file = $fileNameToStore;
            $profile->update();
        }
        return $profile;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
