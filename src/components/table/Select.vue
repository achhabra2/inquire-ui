<template>
<div class="form-group">
  <div class="form-group__text select">
    <select :value="selection" @input="onInput">
      <option disabled value="">Filter by</option>
      <option>Answered</option>
      <option>Unanswered</option>
      <option>All</option>
    </select>
    <label for="input-type-select">Filter By</label>
  </div>
</div>
</template>

<script>
export default {
  props: ['selection'],
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>

<style>
</style>
