<template>
<header-container :loading="loading" title="Submit Feedback">
  <template slot="content">
      <div class="col-md-6 base-margin-top">
        <h2>Feedback Form</h2>
        <br />
          <form>
              <div class="form-group-helper">
                  <div class="form-group__text">
                      <input type="text" id="textarea1" v-model="title" rows="1" required></input>
                      <label for="textarea1">Title</label>
                      <div class="required-block">
                        <span class="icon-asterisk" title="This is a required field"></span>
                      </div>
                  </div>
              </div>
            <br/>
            <textarea class="textarea textarea--well" rows="5" placeholder="Your feedback here..." v-model="feedback" required></textarea>
            <button @click="submitFeedback" class="btn btn--primary">Submit</button>
          </form>
      </div>
      <div class="col-md-6 base-margin-top">
        <h2>Recent Feedback</h2>
        <br />
        <ul class="list" v-if="!feedbacksLoaded">
          <li v-for="feedback in feedbacks" :key="feedback._id">
              <div class="activity activity--bordered">
                  <div class="activity__body">
                      <div class="activity__title">{{feedback.title}}</div>
                      <div class="activity__description">
                        <span>{{feedback.feedback}}</span>
                        <!-- <div class="pull-right">
                          <span>Upvotes</span>
                          <span class="label label--circle label--success"> {{feedback.upvotes}}</span>
                          <button @click="handleUpvote(feedback)"
                          class="btn btn--icon btn--small btn--gray-ghost">
                            <span class="icon-like"></span>
                          </button>
                        </div> -->
                      </div>
                      <div class="activity__timestamp activity__timestamp--bottom">
                      <span>Created {{feedback.createdOn | formatDate}}</span>
                      </div>
                  </div>
              </div>
          </li>
        </ul>
      </div>
  </template>
</header-container>
</template>

<script>
import { mapState } from 'vuex';
import HeaderContainer from './elements/Header.vue';

export default {
  components: {
    HeaderContainer,
  },
  mounted() {
    const params = { query: { $sort: { createdOn: -1 } } };
    this.$store.dispatch('feedback/find', params);
  },
  computed: {
    person() {
      return this.$store.state.auth.user.displayName;
    },
    email() {
      return this.$store.state.auth.user.email;
    },
    feedbacks() {
      return this.$store.getters['feedback/list'];
    },
    ...mapState({
      feedbacksLoaded: state => state.spaces.isFindPending,
    }),
  },
  data() {
    return {
      title: '',
      feedback: '',
      loading: false,
      showToast: false,
      toastMessage: '',
      toastTitle: '',
    };
  },
  methods: {
    async submitFeedback() {
      if (this.title && this.feedback) {
        this.loading = true;
        try {
          await this.$store.state.api.service('feedback').create({
            title: this.title,
            feedback: this.feedback,
            person: this.person,
            email: this.email,
            createdOn: Date.now(),
          });
          console.log('feedback added');
          this.loading = false;
          this.title = '';
          this.feedback = '';
        } catch (error) {
          console.error(error);
          this.loading = false;
          this.title = '';
          this.feedback = '';
        }
      }
    },
    async handleUpvote(feedback) {
      console.log('received feedback upvote', feedback);
      feedback.upvotes += 1;
      feedback.upvoters = feedback.upvoters.push(this.email);
      // try {
      //   const update = {
      //     upvotes: feedback.upvotes + 1,
      //     upvoters: feedback.upvoters.push(this.email),
      //   };
      //   await this.$store.state.api
      //     .service('feedback')
      //     .patch(feedback._id, update);
      // } catch (error) {
      //   console.error(error);
      // }
    },
    requiredInput(input) {
      if (input) return true;
      return false;
    },
    requiredInputClass(input) {
      return {
        'input--invalid-required': this.requiredInput(input),
      };
    },
  },
};
</script>

<style>
</style>
