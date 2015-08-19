$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});
$(function(){

var topic_component = {
  props: ['topic', 'isEdit', 'createTopic'],
  data: function(){
    return {
      isEdit: false,
      topic: {
        title: '',
        id: '',
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
      this.create_or_update().done(function(){
      });
    },
    edit: function(topic){
      this.isEdit = true;
    },
    create_or_update: function(){
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
        console.log('edit ready');
        console.log(this.topic.title);
        this.old_title = this.topic.title;
      },
      methods: {
        cancel: function(e){
          e.preventDefault();
          if(this.topic.id){
            this.topic.title = this.old_title;
            this.isEdit = false;
          }else{
            vm.new = false;
          }
        },
        submit: function(e){
          e.preventDefault();
          this.create_or_update().done(function(data){
            if(this.topic.id){
              this.isEdit = false;
              this.topic.title = data.title;
            }else{
              this.createTopic(data);
            }
          }.bind(this));
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
      topics: [],
      new: false
    }
  },
  methods: {
    add: function(e){
      e.preventDefault();
      vm.$.newTopic.isEdit = true;
    },
    createTopic: function(data){
      this.topics.push(data);
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
    getList: function(){
      $.getJSON('/project/1', function(data){
        console.log(data);
        vm.$set('project', data);
      })
    }
  }
})
});
