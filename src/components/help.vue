<template>
    <div class="ui text container very padded">
      <div>
        <div class="hero hero--indigo">
          <div class="container">
              <div class="hero__content">
                  <h1>Help</h1>
                  <p>Instructions on how to use Inquire. </p>
              </div>
          </div>
        </div>
      <div class="ui attached raised segment">
        <div class="ui relaxed divided big list">
          <div class="item">
            <i class="plus square outline icon"></i>
            <div class="content">
            <div class="header">
            Step 1: Add Inquire bot to your Spark Space.
            </div>
            <div class="description">
              Hint: Find Inquire with the email inquire@sparkbot.io.
              <p></p>
            </div>
            </div>
          </div>
          <div class="item">
            <i class="comments outline icon"></i>
            <div class="content">
            <div class="header">
            Step 2: Tag "<code>@Inquire</code>" in a question.
            </div>
            <div class="description">
              Any statement Inquire records that does not match another command will be logged as a question.
              <p></p>
              <div class="ui tiny message">
              <p> Example: <code>@Inquire What color is the sky? </code> </p>
              </div>
            </div>
            </div>
          </div>
          <div class="item">
            <i class="comment icon"></i>
            <div class="content">
            <div class="header">
            Anyone can answer your question!
            </div>
            <div class="description">
              Other members of your spark space may answer your question with the
              <p> <code>[answer or /a] [question number] [response]</code> format. </p>
              <div class="ui tiny message">
              <p> Example: <code>@Inquire answer 5 The sky is blue. </code> </p>
              </div>
            </div>
            </div>
          </div>
          <div class="item">
            <i class="unordered list icon"></i>
            <div class="content">
            <div class="header">
            View open questions with "<code>@Inquire open</code>".
            </div>
            <div class="description">
              Use the <code>open</code> command to view open questions in a space.
              <div class="ui tiny message">
              <p> Example: <code>@Inquire open </code> </p>
              </div>
            </div>
            </div>
          </div>
          <div class="item">
            <i class="browser icon"></i>
            <div class="content">
            <div class="header">
            Visit the FAQ list here with "<code>@Inquire list</code>".
            </div>
            <div class="description">
              Use the "<code>list</code>" command visit the FAQ list webpage.
              <div class="ui tiny message">
              <p> Example: <code>@Inquire list </code> </p>
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style>

</style>
