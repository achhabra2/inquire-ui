<template lang="pug">
div(class="gauge gauge--alt gauge--small gauge--primary" :data-percentage="percent")
  div(class="gauge__circle")
    div(class="mask full")
      div(class="fill")
    div(class="mask half")
      div(class="fill")
      div(class="fill fix")
  div(class="gauge__inset")
    div(class="gauge__percentage") {{percent}}
</template>

<script>
export default {
  props: {
    percent: {
      required: true,
      type: Number,
    },
  },
};
</script>

<style>
</style>
