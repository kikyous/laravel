<template>
  <li class="with_actions list-group-item {{detail.status === 1 && 'list-group-item-success' }}">
    <div v-if='!editing' class="container">
      <div class="actions">
        <div class="inr">
           <i v-on='click: edit(detail)' class="fa fa-pencil-square-o"> </i>
        </div>
      </div>
      <i v-on='click: toggleStatus' class="fa {{detail.status === 1 ? 'fa-check-square-o' : 'fa-square-o' }}"></i>
      <a href="/topic/{{detail.id}}">{{ detail.name }}</a>
    </div>
    <editor v-if='editing'></editor>
  </li>
</template>

<script>
  module.exports = {
    props: ['detail', 'editing', 'create', 'new'],
    data: function(){
      return {
        editing: false,
        detail: {
          name: '',
          id: null,
          status: 0
        }
      };
    },
    components:{
      editor: require('./editor.vue')
    },
    ready: function(){
      console.log(this.create);
    },
    methods: {
      toggleStatus: function(){
        this.detail.status = this.detail.status ? 0 : 1;
        this.update().done(function(){
        });
      },
      edit: function(topic){
        this.editing = true;
      },
      update: function(){
        return $.ajax({
          url: '/topic/' + this.detail.id,
          method:  this.detail.id ? 'PUT' : 'POST',
          data: this.detail
        });
      }
    }
  }
</script>
