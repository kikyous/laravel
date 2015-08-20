$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});
$(function(){

var topic_component = {
  props: ['topic', 'isEdit', 'createTopic', 'new'],
  data: function(){
    return {
      isEdit: false,
      topic: {
        title: '',
        id: null,
        status: 0
      }
    }
  },
  template: '#topic',
  ready: function(){
    console.log(this.createTopic);
  },
  methods: {
    toggleStatus: function(){
      this.topic.status = this.topic.status ? 0 : 1;
      this.update().done(function(){
      });
    },
    edit: function(topic){
      this.isEdit = true;
    },
    update: function(){
      return $.ajax({
        url: '/topic/' + this.topic.id,
        method:  this.topic.id ? 'PUT' : 'POST',
        data: this.topic
      })
    }
  },
  components: {
    'topic-edit': {
      inherit: true,
      template: "#form",
      ready: function(){
        this.old_title = this.topic.title;
      },
      methods: {
        cancel: function(e){
          e.preventDefault();
          if(this.topic.id){
            this.topic.title = this.old_title;
            this.isEdit = false;
          }else{
            this.new = false;
          }
        },
        submit: function(e){
          e.preventDefault();
          if(this.topic.id){
            this.update().done(function(data){
              this.isEdit = false;
              this.topic.title = data.title;
            }.bind(this));
          } else {
            this.createTopic(this.topic);
          }
        }
      },
    }
  }
};
Vue.component('list', {
  template: "#list",
  props: ['topics', 'name'],
  data: function(){
    return {
      id: null,
      topics: [],
      editing: false,
      new: false
    }
  },
  methods: {
    add: function(e){
      e.preventDefault();
      this.new = true;
    },
    edit: function(){
      this.editing = true;

    },
    createTopic: function(data){
      data['lists_id'] = this.id;
      return $.ajax({
        url: '/topic/',
        method: 'POST',
        data: data
      }).done(function(data){
        this.topics.push(data);
      }.bind(this))
    }
  },
  components: {
    topic: topic_component
  }
});

vm = new Vue({
  el: '#index',
  data: {
    project: {lists: []}
  },
  ready: function(){
    this.getList();
  },
  methods: {
    newList: function(){

    },
    getList: function(){
      $.getJSON('/project/1', function(data){
        console.log(data);
        vm.$set('project', data);
      })
    }
  }
})
});
