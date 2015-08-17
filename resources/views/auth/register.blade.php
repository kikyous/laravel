@extends('layouts.master')

@section('title', 'Log in')
@section('content')
@include('errors.list')
<form method="POST" action="/auth/register">
  {!! csrf_field() !!}
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name" placeholder="Name" name='name' value={{ old('name') }}>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" name='email' value={{ old('email') }}>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name='password'>
  </div>
  <div class="form-group">
    <label for="confirmation">Password Confirmation</label>
    <input type="password" class="form-control" id="confirmation" placeholder="Password Confirmation" name='password_confirmation'>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
@endsection
