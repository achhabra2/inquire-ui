<template>
<header class="header header--compressed">
    <div class="header-bar container">
        <a class="btn btn--small btn--icon toggle-menu" @click="toggleSideBar">
          <span class="icon-list-menu"></span>
        </a>
        <a class="header-bar__logo">
            <span class="icon-cisco"></span>
        </a>
        <div class="header-bar__main">
            <div class="header-heading">
                <h1 class="page-title">Inquire App</h1>
            </div>
        </div>
        <div class="header-toolbar">
          <template v-if="isAuthenticated">
            <img class="ui avatar image bordered" :src="userAvatar" v-if="userAvatar"/>
            <span v-if="userDisplayName">{{userDisplayName}}</span>
            <span>&nbsp; &nbsp;</span>
              <router-link to="/logout" class="item" href="#">
                <span>Log Out</span>
                <!-- <a class="btn btn--small btn--icon btn--negative">
                    <span class="icon-close"></span>
                </a> -->
              </router-link>
          </template>
          <template v-else>
            <router-link to="/login" class="item">
              <span>Log In</span>
              <!-- <a class="btn btn--small btn--icon">
                  <span class="icon-tools"></span>
              </a> -->
            </router-link>
          </template>
        </div>
  </div>
</header>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      if (this.$store.state.auth.accessToken) return true;
      return false;
    },
    userDisplayName() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.displayName;
      }
      return false;
    },
    userAvatar() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.avatar;
      }
      return false;
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar');
    },
  },
};
</script>

<style>

</style>
