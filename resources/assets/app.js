$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

var Vue = require('vue');
var app = new Vue(require('./app.vue'));
