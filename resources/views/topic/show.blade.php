@extends('layouts.master')

@section('content')
<div class="panel panel-default">
  <!-- Default panel contents -->
  <div class="panel-heading">
    {{ $topic->title }}
  </div>
  <div class="panel-body">
    <p>...</p>
  </div>
  <ul class="list-group">
    @foreach ($comments as $_comment)
      <li class="list-group-item">
          {{ $_comment->content }}
      </li>
    @endforeach
  </ul>
</div>
@include('comment.form')
@endsection
