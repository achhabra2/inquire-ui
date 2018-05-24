<template>
<div class="hero hero--indigo hero--regular">
  <div class="container">
    <div class="hero__content text-center">
      <h1>
        <span>{{msg}}</span>
      </h1>
      <h3>FAQ Page</h3>
      <slot name="content"></slot>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'banner',
  props: ['space'],
  computed: {
    msg() {
      return this.$store.state.spaces.keyedById[this.space].displayName;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
