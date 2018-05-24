<template lang="pug">
  div(class="content")
    div(class="loading-spinner flex-center" :class="{hide: !loading}")
      div(class="wrapper")
        div(class="wheel")
    banner(:space="space" v-if="!loading")
      template(slot="content")
        gauge(:percent="answeredPercentage(spaceData)")
    div(class="container")
      sticky(v-if="spaceData.sticky" :html="spaceData.sticky")
      spacetable(@loading:change="handleLoadingChange" :space="space")
      div(class="pull-right")
        export-space(:space="space")
</template>

<script>
import spacetable from './spaceTable.vue';
import banner from './banner.vue';
import exportSpace from './exportSpace.vue';
import sticky from './elements/Sticky.vue';

export default {
  components: {
    spacetable,
    banner,
    exportSpace,
    sticky,
  },
  data() {
    return {
      loading: true,
    };
  },
  props: ['space'],
  computed: {
    spaceData() {
      return this.$store.state.spaces.keyedById[this.space];
    },
  },
  mounted() {
    this.$store.dispatch('spaces/find');
  },
  methods: {
    handleLoadingChange(event) {
      this.loading = event;
    },
    answeredPercentage(space) {
      const questionCount = space.questionCount || space.sequence;
      if (space.answerCount) {
        const percent = space.answerCount / questionCount;
        return Math.floor(percent * 100);
      }
      return 0;
    },
  },
};
</script>
<style>
.gauge {
  margin: 10 auto 10 auto;
}
</style>
