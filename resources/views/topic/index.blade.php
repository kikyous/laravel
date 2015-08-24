@extends('layouts.master')

@section('content')

<script type="text/x-template" id="form">
<form v-on='submit: submit'>
  <input v-model='detail.name'>
  <button type='submit' class='btn btn-success btn-xs'>Save</button>
  <a href='#' v-on='click: cancel' class='btn-cancel'>Cancel</a>
</form>
</script>

<script type="text/x-template" id="topic">
<li class="with_actions list-group-item @{{detail.status === 1 && 'list-group-item-success' }}">
  <div v-if='!editing' class="container">
    <div class="actions">
      <div class="inr">
         <i v-on='click: edit(detail)' class="fa fa-pencil-square-o"> </i>
      </div>
    </div>
    <i v-on='click: toggleStatus' class="fa @{{detail.status === 1 ? 'fa-check-square-o' : 'fa-square-o' }}"></i>
    <a href="/topic/@{{detail.id}}">@{{ detail.name }}</a>
  </div>
  <editor v-if='editing'></editor>
</li>
</script>
<script type="text/x-template" id="list">
<div class="panel panel-default">
  <div class="with_actions panel-heading">
    <div class="actions">
      <div class="inr">
         <i v-on='click: edit' class="fa fa-pencil-square-o"> </i>
      </div>
    </div>
  @{{ name }}
  <input type="text" v-if='editing' name='name' v-model='name'>
  </div>
  <ul class="list-group">
    <topic v-repeat='detail in topics'></topic>
    <topic v-if='new' editing='true' create='@{{createItem}}' new='@{{@ new}}'></topic>
  </ul>
  <div class="panel-footer">
    <a href="#" v-on='click: add'>Add a todo</a>
  </div>
</div>
</script>

<div id="index">
  <button v-on='click: newList' class="btn btn-success">Add Todo List</button>
  <list></list>
  <list v-repeat='project.lists'></list>
</div>
@endsection
