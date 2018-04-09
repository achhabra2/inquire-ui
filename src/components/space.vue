<template lang="pug">
  div(class="content")
    div(class="container")
      div(class="loading-spinner flex-center" :class="{hide: !loading}")
        div(class="wrapper")
          div(class="wheel")
      banner(:space="space" v-if="!loading")
      spacetable(@loading:change="handleLoadingChange" :space="space")
      div(class="pull-right")
        export-space(:space="space")
</template>

<script>
import spacetable from './spaceTable.vue';
import banner from './banner.vue';
import exportSpace from './exportSpace.vue';

export default {
  components: {
    spacetable,
    banner,
    exportSpace,
  },
  data() {
    return {
      loading: true,
    };
  },
  props: ['space'],
  mounted() {
    this.$store.dispatch('spaces/find');
  },
  methods: {
    handleLoadingChange(event) {
      this.loading = event;
    },
  },
};
</script>
