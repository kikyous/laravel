@extends('layouts.master')

@section('content')
<div id="index">
  <button v-on='click: newList' class="btn btn-success">Add Todo List</button>
  <list></list>
  <list v-repeat='project.lists'></list>
</div>
@endsection
