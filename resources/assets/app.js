$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

var Vue = require('vue');
var appOptions = require('./app.vue');
var app = new Vue(appOptions);
