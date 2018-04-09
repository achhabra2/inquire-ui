<template>
  <div class="sidebar" :class="{'sidebar--hidden': !active}">
  <div class="sidebar__header">
      <div class="sidebar__header-title">Menu</div>
  </div>
  <ul>
    <router-link
      v-if="isAuthenticated"
      to="/announcements"
      tag="li"
      class="sidebar__item"
      ><a>Announcements</a></router-link>
      <router-link
      to="/about"
      tag="li"
      class="sidebar__item"
      ><a>About</a></router-link>
      <router-link
      v-if="isAuthenticated"
      to="/spaces"
      tag="li"
      class="sidebar__item"
      ><a>Spaces</a></router-link>
      <router-link
      to="/help"
      tag="li"
      class="sidebar__item"
      ><a>Help</a></router-link>
      <router-link
      v-if="isAuthenticated"
      to="/contact"
      tag="li"
      class="sidebar__item"
      ><a>Feedback</a></router-link>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    isAuthenticated() {
      if (this.$store.state.auth.accessToken) return true;
      return false;
    },
  },
};
</script>

<style>

</style>
