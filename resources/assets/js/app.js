$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});
$(function(){
Vue.component('list', {

});
Vue.component('topic', {
  props: ['topic', 'isEdit'],
  data: function(){
    return {
      isEdit: false,
      topic: {
        title: '',
        id: ''
      }
    }
  },
  template: '#topic',
  methods: {
    edit: function(topic){
      this.isEdit = true;
    }
  },
  components: {
    'topic-edit': {
      props: ['topic', 'isEdit'],
      data: function(){
        return {
          isEdit: false,
          newTopic: {
            title: ''
          },
          topic: {
            title: '',
            id: ''
          }
        }
      },
      template: "#form",
      ready: function(){
        console.log('edit ready');
        this.newTopic.title = this.topic.title;
      },
      methods: {
        cancel: function(e){
          e.preventDefault();
          if(this.topic.id){
            this.isEdit = false;
          }else{
            vm.new = false;
          }
        },
        submit: function(e){
          e.preventDefault();
          $.ajax({
            url: '/topic/' + this.topic.id,
            method:  this.topic.id ? 'PUT' : 'POST',
            data: this.newTopic
          }).done(function(data){
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
  el: '#topics',
  data: {
    topics: [{title: ''}],
    new: false
  },
  ready: function(){
    this.getTopics();
  },
  methods: {
    add: function(){
      vm.$.newTopic.isEdit = true;
    },
    getTopics: function(){
      $.getJSON('/topic', function(data){
        console.log(data);
        vm.$set('topics', data);
      })
    }
  },
})
});
