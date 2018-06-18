<template>
  <div class="form-group">
    <div class="form-group__text">
      <input type="text" v-model="inputText" @keyup.enter="processInput">
      <label>Enter {{field}}</label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      inputText: '',
      placeholderText: 'Ask a question.',
      field: 'Question',
    };
  },
  props: ['space', 'question'],
  mounted() {
    if (this.question) {
      this.placeholderText = 'Enter an answer. ';
      this.field = 'Answer';
    }
  },
  methods: {
    processInput(event) {
      event.preventDefault();
      this.$emit('action', this.inputText);
      this.inputText = '';
      event.target.blur();
    },
  },
};
</script>

<style>
</style>
