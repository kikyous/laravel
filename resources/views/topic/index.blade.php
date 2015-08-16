@extends('layouts.master')

@section('content')
<div class="panel panel-default">
  <!-- Default panel contents -->
  <div class="panel-heading">
  Panel heading
  <a href="{{ URL::route('topic.create') }}" class='pull-right btn btn-success btn-xs'>Create</a>
  </div>
  <div class="panel-body">
    <p>...</p>
  </div>
  <ul class="list-group">
    @foreach ($topics as $topic)
      <li class="list-group-item">
        {{ $topic->title }}
        <div class="btn-group pull-right" role="group" aria-label="...">
          <a href="{{ URL::route('topic.edit', $topic->id) }}" class='btn btn-default btn-xs'>Edit</a>
        </div>
        <div class='clearfix'></div>
      </li>
    @endforeach
  </ul>
</div>
@endsection
