<template>
  <form>
    <textarea v-model="text" class="textarea textarea--well" rows="3"></textarea>
  </form>
</template>

<script>
export default {
  props: {
    initialData: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      text: '',
    };
  },
  mounted() {
    this.text = this.initialData;
  },
};
</script>

<style>

</style>
