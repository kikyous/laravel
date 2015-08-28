<script>
module.exports = {
  el: '#index',
  data: {
    project: {
      id: null,
      lists: []
    }
  },
  ready: function(){
    this.getList();
  },
  components:{
    list: require('./components/list.vue')
  },
  methods: {
    newList: function(){
    },
    getList: function(){
      $.getJSON('/project/1', function(data){
        this.$set('project', data);
      }.bind(this));
    },
    createList: function(data){
      data.project_id = this.id;
      return $.ajax({
        url: '/list/',
        method: 'POST',
        data: data
      }).done(function(data){
        this.lists.push(data);
      }.bind(this));
    }
  }
}
</script>
