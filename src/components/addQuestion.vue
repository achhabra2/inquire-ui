<template>
<form>
  <div class="form-group">
    <div class="form-group__text">
      <input id="addq" type="text" v-model="inputText" @keyup.enter="processInput">
      <label for="text">Post {{field}}</label>
      <button @click="processInput" type="button" class="link"><span class="icon-help-alt"></span></button>
    </div>
  </div>
  <div class="alert alert--success" v-if="successActive">
    <div class="alert__icon icon-check"></div>
    <div class="alert__message">Post Success</div>
    <div class="alert__close icon-close" @click="successActive = !successActive"></div>
  </div>
  <div class="alert alert--danger" v-if="errorActive">
    <div class="alert__icon icon-error"></div>
    <div class="alert__message">Error Posting</div>
    <div class="alert__close icon-close" @click="errorActive = !errorActive"></div>
  </div>
</form>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      inputText: '',
      successActive: false,
      errorActive: false,
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
