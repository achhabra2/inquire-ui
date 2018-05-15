<template>
  <header-container :loading="motdsLoaded" title="Announcements">
    <template slot="content">
      <div class="col-md-12">
      <ul class="list" v-if="!motdsLoaded">
        <li v-for="motd in motds" :key="motd._id">
            <div class="activity activity--bordered">
                <div class="activity__body">
                    <div class="activity__description" v-html="motd.message"></div>
                    <div class="activity__timestamp activity__timestamp--bottom">Created {{motd.createdOn | formatDate}}</div>
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
import HeaderContainer from '../elements/Header.vue';

export default {
  components: {
    HeaderContainer,
  },
  mounted() {
    const params = { query: { $sort: { createdOn: -1 } } };
    this.$store.dispatch('motds/find', params);
  },
  computed: {
    motds() {
      return this.$store.getters['motds/list'];
    },
    ...mapState({
      motdsLoaded: state => state.spaces.isFindPending,
    }),
  },
};
</script>

<style>
</style>
