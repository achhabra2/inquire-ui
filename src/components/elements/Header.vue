<template lang="pug">
div(class="content")
  //- div(class="container")
  //-   div(class="section section--marquee-both")
  div(class="hero hero--indigo")
    div(class="container")
      div(class="hero__content")
        h1(class="section__title text-uppercase text-center") {{title}}
  div(class="loading-spinner flex-center" :class="{hide: !loading}")
    div(class="wrapper")
      div(class="wheel")
  div(class="panel panel--lose depth-3")
    div(class="row justify-content-center")
      //- div(class="col")
      slot(name="content")
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style>
</style>
