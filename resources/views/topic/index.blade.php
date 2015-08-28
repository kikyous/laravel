@extends('layouts.master')

@section('content')
<div id="index">
  <button v-on='click: newList' class="btn btn-success">Add Todo List</button>
  <list editing='true' new='true'></list>
  <list v-repeat='detail in project.lists'></list>
</div>
@endsection
