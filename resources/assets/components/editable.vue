<script>
  module.exports = function(){
  return {
    props: ['detail', 'editing', 'create', 'new', 'url'],
    data: function(){
      return {
        url: '/topic/',
        editing: false,
        detail: {
          name: '',
          id: null,
          status: 0
        }
      };
    },
    components:{
      editor: require('./editor.vue')
    },
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
          url: this.url + this.detail.id,
          method:  this.detail.id ? 'PUT' : 'POST',
          data: this.detail
        });
      }
    }
  };
};
</script>
