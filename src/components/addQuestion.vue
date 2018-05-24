<template>
<form>
  <div class="form-group">
    <div class="form-group__text">
      <input id="addq" type="text" v-model="inputText" @keyup.enter="processInput">
      <label for="text">Enter {{field}}</label>
      <button @click="processInput" type="button" class="link">Send</button>
    </div>
  </div>
</form>
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
      this.$emit('action', this.inputText);
      this.inputText = '';
    },
  },
};
</script>

<style>
</style>
