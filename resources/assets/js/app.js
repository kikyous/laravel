$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});
$(function(){
Vue.component('topic', {
  props: ['topic'],
  data: function(){
    return {
      isEdit: false,
      topic: {
        title: ''
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
            title: ''
          }
        }
      },
      template: "#form",
      methods: {
        submit: function(e){
          e.preventDefault();
          // $.ajax();
          this.isEdit = true;
          console.log(this.newTopic.title);
        }
      },
      computed: {
        title: {
          get: function(){
            return this.topic.title;
          },
          set: function(value){
            this.newTopic.title = value;
          }
        }
      }
    }
  }
});
var vm = new Vue({
  el: '#topics',
  data: {
    topics: [{title: ''}]
  },
  ready: function(){
    this.getTopics();
  },
  methods: {
    getTopics: function(){
      $.getJSON('/topic', function(data){
        console.log(data);
        vm.$set('topics', data);
      })
    }
  },
})
});
