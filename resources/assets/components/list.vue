<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <list_header detail='{{detail}}' create='{{createList}}' url='/list/'></list_header>
    </div>
    <ul class="list-group">
      <topic v-repeat='detail in detail.topics'></topic>
      <topic v-if='new' editing='true' create='{{createItem}}' new='{{@ new}}'></topic>
    </ul>
    <div class="panel-footer">
      <a href="#" v-if='detail.id' v-on='click: add'>Add a todo</a>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: ['topics', 'name'],
  data: function(){
    return {
      detail: {
        id: null,
        name: '',
        topics: []
      },
      editing: false,
      new: false
    };
  },
  components: {
    topic: require('./topic.vue'),
    list_header: require('./list_header.vue')
  },
  methods: {
    add: function(e){
      e.preventDefault();
      this.new = true;
    },
    edit: function(){
      this.editing = true;
    },
    createItem: function(data){
      data.lists_id = this.detail.id;
      return $.ajax({
        url: '/topic/',
        method: 'POST',
        data: data
      }).done(function(data){
        this.detail.topics.push(data);
      }.bind(this));
    }
  }
}
</script>
