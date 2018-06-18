<template>
  <div class="form-group">
    <div class="form-group__text">
      <input type="search" name="q" placeholder="Type a keyword" v-model="filterText" @keyup.enter="doFilter" @search="doFilter">
      <label for="search">Search Questions</label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: '',
    };
  },
  methods: {
    doFilter(event) {
      event.preventDefault();
      event.target.blur();
      this.$emit('filter-set', this.filterText);
    },
    resetFilter() {
      this.filterText = ''; // clear the text in text input
      this.$emit('filter-reset');
    },
  },
};
</script>
<style>
</style>
