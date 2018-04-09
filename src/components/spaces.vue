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
                        span(v-if="space.teamName" class="label label--info") Team | {{space.teamName}}
                        br
                        span Questions &nbsp;
                        span(class="label label--circle label--success") {{space.sequence}}
                        span &ensp;
                        span Moderation &nbsp;
                        span(v-if="space.moderators && space.moderators.length > 0" class="icon-lock")
                        span(v-else class="icon-unlock")
                        div(class="pull-right")
                          export-space(:space="space._id")
                      div(class="activity__timestamp")
                        span(class="label") Active {{(space.lastActivity) ? space.lastActivity : 'N/A' | formatLastActive }}

</template>

<script>
import { mapState, mapActions } from 'vuex';
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
    ...mapState({
      userSpacesLoaded: state => state.spaces.isFindPending,
    }),
  },
  mounted() {
    this.$store.dispatch('spaces/find');
  },
  watch: {
    userSpacesLoaded(bool) {
      if (bool) this.loading = false;
    },
  },
};
</script>

<style>

</style>
