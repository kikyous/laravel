@extends('layouts.master')

@section('content')
<form action="{{ URL('topic/'.$topic->id) }}" method="POST">
  {!! csrf_field() !!}
  @if ($topic->id)
    <input name="_method" type="hidden" value="PUT">
  @endif
  <div class="form-group">
    <label for="exampleInputEmail1">Title</label>
    <input type="text" name='title' class="form-control" id="exampleInputEmail1" placeholder="Title" value='{{ $topic->title }}'>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Content</label>
    <textarea class="form-control" name='content'>{{ $topic->content }}</textarea>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
@endsection
