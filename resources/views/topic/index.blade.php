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
        <div class="btn-group hide actions" role="group" aria-label="...">
          <a href="{{ URL::route('topic.edit', $topic->id) }}">
            <i class="fa fa-pencil-square-o"> </i>
          </a>
        </div>
        <a href="{{ URL::route('topic.show', $topic->id) }}">
          {{ $topic->title }}
        </a>
      </li>
    @endforeach
  </ul>
</div>
@endsection
