<template>
  <div class="panel panel-default">
    <div class="with_actions panel-heading">
      <div class="actions">
        <div class="inr">
           <i v-on='click: edit' class="fa fa-pencil-square-o"> </i>
        </div>
      </div>
    {{ name }}
    <input type="text" v-if='editing' name='name' v-model='name'>
    </div>
    <ul class="list-group">
      <topic v-repeat='detail in topics'></topic>
      <topic v-if='new' editing='true' create='{{createItem}}' new='{{@ new}}'></topic>
    </ul>
    <div class="panel-footer">
      <a href="#" v-on='click: add'>Add a todo</a>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: ['topics', 'name'],
  data: function(){
    return {
      id: null,
      topics: [],
      editing: false,
      new: false
    };
  },
  components: {
    topic: require('./topic.vue')
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
      data.lists_id = this.id;
      return $.ajax({
        url: '/topic/',
        method: 'POST',
        data: data
      }).done(function(data){
        this.topics.push(data);
      }.bind(this));
    }
  }
}
</script>
