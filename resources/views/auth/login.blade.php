@extends('layouts.master')

@section('title', 'Log in')
@section('content')
@include('errors.list')
<form method="POST" action="/auth/login">
  {!! csrf_field() !!}
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" name='email' value={{ old('email') }}>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name='password'>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox" name='Remember me'> Remember me
    </label>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
@endsection
