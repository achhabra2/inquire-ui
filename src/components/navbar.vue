<template>
<div class="ui inverted massive stackable menu grey">
  <div class="header item">
    <img class="logo" src="../assets/logo.png">
  </div>
  <div class="header item">
    Inquire App
  </div>
  <router-link to="/about" class="item"><a>About</a></router-link>
  <router-link v-if="isAuthenticated" to="/spaces" class="item"><a>Spaces</a></router-link>
  <router-link to="/help" class="item"><a>Help</a></router-link>
  <router-link to="/contact" class="item"><a>Feedback</a></router-link>
  <div v-if="isAuthenticated" class="ui simple dropdown item">
    <img class="ui avatar image bordered" :src="userAvatar" />
    <span>&nbsp; {{userDisplayName}}</span>
    <div class="menu">
      <router-link to="/logout" class="item" href="#">Logout</router-link>
    </div>
  </div>
  <router-link to="/login" v-if="!isAuthenticated" class="item">
    Login
  </router-link>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      userDisplayName: null,
      userAvatar: null,
    };
  },
  computed: {
    path() {
      let regex = /space/i;
      let match = regex.exec(this.$store.state.route.path);
      if (match) return true;
      return false;
    },
    ...mapState({
      isAuthenticated: state => state.auth.accessToken,
      currentUser: state => state.auth.user,
    }),
  },
  methods: mapActions(['loadAuthentication']),
  mounted() {},
  watch: {
    currentUser(user) {
      if (user) {
        this.userDisplayName = user.displayName;
        this.userAvatar = user.avatar;
      }
    },
  },
};
</script>
<style>

</style>
