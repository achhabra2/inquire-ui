<template>
<div class="content">
  <table class="table table--bordered table--wrap">
    <thead>
      <tr>
        <th class="center aligned one wide">#</th>
        <th class="ten wide">Answer</th>
        <th class="two wide">Date</th>
        <th class="three wide">Answerer</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(answer, index) in rowData.answers" :key="index">
        <td class="center aligned">{{index + 1}}</td>
        <td>
          <vue-markdown :source="answer.html ? answer.html : answer.text"></vue-markdown>
        </td>
        <td>{{answer.createdOn|formatDate}}</td>
        <td>{{answer.displayName}}</td>
      </tr>
    </tbody>
  </table>
  <div class="ui teal segment">
    <add-question :space="rowData._room" :question="rowData" @action="onClick">
    </add-question>
  </div>
</div>
</template>


<script>
import VueMarkdown from 'vue-markdown';
import addQuestion from './addQuestion.vue';

export default {
  components: {
    VueMarkdown,
    addQuestion,
  },
  props: {
    rowData: {
      type: Object,
      required: true,
    },
    rowIndex: {
      type: Number,
    },
  },
  methods: {
    onClick(answerText) {
      this.$events.$emit('answer', {
        question: this.rowData,
        answer: answerText,
      });
    },
  },
};
</script>

<style scoped>
td {
  word-wrap: break-word;
}
</style>
