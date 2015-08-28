<template>
  <div v-if='!editing' class="container with_actions">
    <div class="actions">
      <div class="inr">
         <i v-on='click: edit(detail)' class="fa fa-pencil-square-o"> </i>
      </div>
    </div>
    <a href="/lists/{{detail.id}}">{{ detail.name }}</a>
  </div>
  <editor v-if='editing'></editor>
</template>
<script>
  module.exports = require('./editable.vue')();
</script>
