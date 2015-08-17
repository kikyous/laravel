<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Topic;
use App\Comment;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class TopicController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request)
    {
      $topics = Topic::all();
      if ($request->format() != 'html'){
        return $topics;
      } else{
        return view('topic.index', ['topics' => $topics]);
      }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        return view('topic.create')->withTopic(new Topic);;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
      $topic = new Topic;
      $topic->title = $request->input('title');
      $topic->user_id = 1;//Auth::user()->id;

      if ($topic->save()) {
        return redirect('topic');
      } else {
        return redirect()->back()->withInput();
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
      $topic = Topic::findOrFail($id);
      return view('topic.show')
        ->with('topic', $topic)
        ->with('comments', $topic->comments)
        ->with('comment', new Comment(['topic_id' => $id]));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        return view('topic.create')->withTopic(Topic::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
      $topic = Topic::findOrFail($id);
      $input = array_except($request->input(), '_method');

      if ($topic->update($input)) {
        return redirect('topic');
      } else {
        return redirect()->back()->withInput();
      }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
