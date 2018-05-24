<template lang="pug">
div(class="content")
  div(class="container")
    div(class="section section--marquee-both")
      div(class="hero hero--indigo")
        div(class="container")
          div(class="hero__content")
            h1(class="section__title text-uppercase text-center") Available FAQ Spaces
      div(class="loading-spinner flex-center" :class="{hide: !loading}")
        div(class="wrapper")
          div(class="wheel")
      div(class="panel panel--lose depth-3")
        div(class="row")
            div(class="col")
              ul(v-if="!loading" class="list list--aligntop")
                li(v-for="space in userSpaces" :key="space._id")
                  div(class="activity activity--bordered")
                    div(class="activity__body")
                      router-link(class="activity__title" v-bind:to="'/space/' + space._id")
                        a {{space.displayName}}
                      div(class="activity__description")
                        br
                        template(v-if="space.teamName")
                          span Team &nbsp;
                          span(class="label label--info") {{space.teamName}}
                        template(v-if="space.answerCount")
                          span &nbsp; Ans. &nbsp;
                          span(class="label label--circle label--warning") {{space.answerCount}}
                        span &nbsp; Ques. &nbsp;
                        span(class="label label--circle label--success") {{space.questionCount ||space.sequence}}
                        span &ensp;
                        span Mod. &nbsp;
                        span(v-if="space.moderators && space.moderators.length > 0" class="icon-lock")
                        span(v-else class="icon-unlock")
                        div(class="pull-right")
                          template(v-if="isModerator(space)")
                            //- button(class="btn btn--icon btn--small" @click="handleEditSpace(space)")
                            //-   span(class="icon-draw")
                            button(class="btn btn--icon btn--small btn--negative" @click="handleRemoveSpace(space)")
                              span(class="icon-trash")
                          export-space(:space="space._id")
                      div(class="activity__timestamp")
                        span(class="label" :style="{'align-items': 'center'}") Active {{(space.lastActivity) ? space.lastActivity : 'N/A' | formatLastActive }}

</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import exportSpace from './exportSpace.vue';

export default {
  data() {
    return {
      loading: true,
    };
  },
  components: {
    exportSpace,
  },
  computed: {
    userSpaces() {
      return this.$store.getters['spaces/list'];
    },
    personId() {
      return this.$store.state.auth.user.ciscosparkId;
    },
    ...mapState({
      userSpacesLoaded: state => state.spaces.isFindPending,
    }),
  },
  mounted() {
    const params = { query: { $limit: 99 } };
    this.$store.dispatch('spaces/find', params);
  },
  watch: {
    userSpacesLoaded(bool) {
      if (bool) this.loading = false;
      this.userSpaces.forEach(async (space) => {
        if (space.teamId && !space.teamName) {
          try {
            await this.getTeamName(space);
          } catch (error) {
            console.log('Could not fetch team information. ');
          }
        }
      });
    },
  },
  methods: {
    async handleEditSpace(space) {},
    async handleRemoveSpace(space) {
      this.loading = true;
      try {
        const params = {
          query: { _room: space._id },
        };
        await this.$store.state.api.service('questions').remove(null, params);
        await this.$store.state.api.service('spaces').remove(space._id);
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    async getTeamName(space) {
      axios.defaults.headers.common.Authorization = `Bearer ${
        this.$store.state.auth.user.ciscospark.accessToken
      }`;
      const url = `https://api.ciscospark.com/v1/teams/${space.teamId}`;
      const response = await axios.get(url);
      const teamName = response.data.name;
      console.log('Found team:', response.data);
      await this.$store.state.api
        .service('spaces')
        .patch(space._id, { teamName });
      console.log('Successfully updated team data. ');
    },
    isModerator(space) {
      if (space.moderators && space.moderators.length > 0) {
        if (space.moderators.indexOf(this.personId) !== -1) {
          return true;
        }
        return false;
      }
      return false;
    },
  },
};
</script>

<style>
</style>
