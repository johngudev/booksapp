<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // return Meeting::all();
        return Meeting::with(['book', 'host', 'attendees'])->get();

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('make-meeting');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user_id = request()->user()->id;
    
        // Merge the user_id into the request data
        $data = $request->all();
        $data['user_id'] = $user_id;
    
        // Validate the incoming data
        $validatedData = $request->validate([
            'book_id' => 'required|exists:books,id',
            'zoom_link' => 'required',
            'date_time' => 'required|date',
            'description' => 'required',
        ]);
    
        // Store the meeting in the database
        return Meeting::create(array_merge($validatedData, ['user_id' => $user_id]));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Meeting  $meeting
     * @return \Illuminate\Http\Response
     */
    public function show(Meeting $meeting)
    {
        // return $meeting;
        $meeting->load(['book', 'host', 'attendees']);
        return $meeting;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Meeting  $meeting
     * @return \Illuminate\Http\Response
     */
    public function edit(Meeting $meeting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Meeting  $meeting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Meeting $meeting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Meeting  $meeting
     * @return \Illuminate\Http\Response
     */
    public function destroy(Meeting $meeting)
    {
        //
    }

    public function list()
    {
        return view('meetings');
    }


    public function linkToUser(Meeting $meeting)
    {
        $user = request()->user();

        $user->attendingMeetings()->syncWithoutDetaching([$meeting->id]);

        return response()->json(['message' => 'Meeting attached to user successfully']);

    }

    public function unlinkFromUser(Meeting $meeting)
    {
        $user = request()->user();

        $user->attendingMeetings()->detach($meeting->id);

        return response()->json(['message' => 'Meeting detached from user successfully']);

    }

    public function linkedUsers(Meeting $meeting)
    {
        return $meeting->users;
    }

    public function storeFromSession(Request $request)
    {
        $user_id = request()->user()->id;
    
        // Merge the user_id into the request data
        $data = $request->all();
        $data['user_id'] = $user_id;
    
        // Validate the incoming data
        $validatedData = $request->validate([
            'book_id' => 'required|exists:books,id',
            'zoom_link' => 'required',
            'date_time' => 'required|date',
            'description' => 'required',
        ]);
    
        // Store the meeting in the database
        return Meeting::create(array_merge($validatedData, ['user_id' => $user_id]));
    }
}
