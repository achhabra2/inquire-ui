<template>
<form>
  <div class="form-group">
    <div class="form-group__text">
      <input type="search" v-model="filterText" @keyup.enter="doFilter">
      <label for="search">Search Questions</label>
      <button class="link" type="button" @click="doFilter">
        <span class="icon-search"></span>
      </button>
      <!-- <button class="link" @click="resetFilter"><span class="icon-tools"></span></button> -->
    </div>
  </div>
</form>
</template>

<script>
export default {
  data() {
    return {
      filterText: '',
    };
  },
  methods: {
    doFilter() {
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
