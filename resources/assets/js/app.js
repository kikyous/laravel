$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});
$(function(){
Vue.component('list', {
  data: function(){
    return {
      topics: [{title: ''}],
      new: false
    }
  },
  methods: {
    add: function(e){
      e.preventDefault();
      vm.$.newTopic.isEdit = true;
    },
  },
});
Vue.component('topic', {
  props: ['topic', 'isEdit'],
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
              vm.topics.push(data);
            }
          }.bind(this));
        }
      },
    }
  }
});

var vm = new Vue({
  el: '#index',
  data: {
  },
  ready: function(){
    this.getList();
  },
  methods: {
    getList: function(){
      $.getJSON('/project/1', function(data){
        console.log(data);
        vm.$set('topics', data);
      })
    }
  }
})
});
