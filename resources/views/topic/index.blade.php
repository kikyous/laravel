@extends('layouts.master')

@section('content')

<script type="text/x-template" id="form">
<form v-on='submit: submit' action='/topic/@{{topic.id}}' method='POST'>
  <input v-model='title' name='title'>
  <button type='submit' class='btn btn-success btn-xs'>Save</button>
  <a href='#' v-on='click: isEdit=false' class='btn-cancel'>取消</a>
</form>
</script>

<script type="text/x-template" id="topic">
<li class="list-group-item">
  <div v-if='!isEdit' class="content">
    <div class="btn-group hide actions" role="group" aria-label="...">
       <i v-on='click: edit(topic)' class="fa fa-pencil-square-o"> </i>
    </div>
    <a href="/topic/@{{topic.id}}">@{{ topic.title }}</a>
  </div>
  <topic-edit v-if='isEdit' topic='@{{topic}}' is-edit="@{{@ isEdit}}"></topic-edit>
</li>
</script>
<div class="panel panel-default">
  <!-- Default panel contents -->
  <div class="panel-heading">
  Panel heading
  <a href="{{ URL::route('topic.create') }}" class='pull-right btn btn-success btn-xs'>Create</a>
  </div>
  <div class="panel-body">
    <p>...</p>
  </div>
  <ul class="list-group" id='topics'>
    <topic v-repeat='topic in topics'></topic>
  </ul>
</div>
@endsection
