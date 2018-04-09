<template>
<div class="ui text container">
  <div class="ui segment raised padded">
    <div class="ui inverted dimmer" :class="{active: loading}">
      <div class="ui large text loader">Loading</div>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div class="ui success message">
      <h1 class="ui icon header">
        <i class="privacy icon"></i>
        <div class="content">
          You have successfully logged out.
        </div>
      </h1>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      loading: true
    };
  },
  computed: mapState({
    logoutPending: state => state.auth.logoutPending
  }),
  mounted: function() {
    this.$store.dispatch("auth/logout");
  },
  watch: {
    logoutPending: function(auth) {
      if (!auth) this.loading = false;
    }
  }
};
</script>

<style>

</style>
