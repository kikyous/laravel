$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});
$(function(){

var topic_component = {
  props: ['detail', 'editing', 'create', 'new'],
  data: function(){
    return {
      editing: false,
      detail: {
        name: '',
        id: null,
        status: 0
      }
    }
  },
  template: '#topic',
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
      })
    }
  },
  components: {
    editor: {
      inherit: true,
      template: "#form",
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
    createItem: function(data){
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
