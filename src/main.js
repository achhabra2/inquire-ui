import Vue from 'vue';
import VueEvents from 'vue-events';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import Toast from 'vue-easy-toast';
import moment from 'moment';
import 'semantic-ui-css/semantic.min.css';
import './cisco-ui/css/cui-standard.min.css';
import './registerServiceWorker';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.use(VueRouter);
Vue.use(VueEvents);
Vue.use(Toast);

Vue.config.productionTip = false;

Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(String(value)).format('MM-DD-YYYY');
  }
});

Vue.filter('formatLastActive', (value) => {
  if (value !== 'N/A') {
    return moment(String(value)).format('MMMM Do, h:mm a');
  }
  return 'N/A';
});

sync(store, router);

store.dispatch('init').then((res) => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});
