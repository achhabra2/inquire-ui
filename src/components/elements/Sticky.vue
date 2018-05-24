<template>
<div>
<div class="divider divider--thick"></div>
<div class="alert">
    <div class="alert__icon icon-info-circle"></div>
    <div class="alert__message" v-html="html"></div>
    <!-- <div class="alert__close icon-close"></div> -->
</div>
<div class="divider divider--thick"></div>
</div>
</template>

<script>
export default {
  props: {
    html: {
      required: true,
    },
  },
};
</script>

<style>
</style>
