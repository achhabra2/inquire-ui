<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
body {
  overflow: auto;
}
</style>

<template>
<div id="app" class="cui">
  <div class="content-fluid">
    <Sidebar :active="sideBarActive"></Sidebar>
    <main>
      <Navbar></Navbar>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <ui-footer></ui-footer>
    </main>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import Navbar from './components/views/Navbar.vue';
import Sidebar from './components/views/Sidebar.vue';
import UiFooter from './components/views/Footer.vue';
import Toast from './components/elements/Toast.vue';
import Gauge from './components/elements/Gauge.vue';

Vue.component('toast', Toast);
Vue.component('gauge', Gauge);

export default {
  name: 'app',
  components: {
    Navbar,
    Sidebar,
    UiFooter,
  },
  data() {
    return {};
  },
  computed: {
    sideBarActive() {
      return this.$store.state.sideBarActive;
    },
  },
  mounted() {
    this.$store
      .dispatch('auth/authenticate')
      .catch(error => console.log('Unauthenticated...'));
  },
};
</script>
