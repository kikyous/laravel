<template>
  <form v-on='submit: submit'>
    <input v-model='detail.name'>
    <button type='submit' class='btn btn-success btn-xs'>Save</button>
    <a href='#' v-on='click: cancel' class='btn-cancel'>Cancel</a>
  </form>
</template>

<script>
  module.exports = {
    inherit: true,
    ready: function(){
      this.old_name = this.detail.name;
    },
    methods: {
      cancel: function(e){
        e.preventDefault();
        if(this.detail.id){
          this.detail.name = this.old_name;
          this.editing = false;
        }else{
          this.new = false;
        }
      },
      submit: function(e){
        e.preventDefault();
        if(this.detail.id){
          this.update().done(function(data){
            this.editing = false;
            this.detail.name = data.name;
          }.bind(this));
        } else {
          this.create(this.detail);
        }
      }
    },
  }
</script>
