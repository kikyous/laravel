<script>
module.exports = {
  el: '#index',
  data: {
    project: {lists: []}
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
    }
  }
}
</script>
