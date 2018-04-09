import Vue from 'vue';
import VueRouter from 'vue-router';
import localForage from 'localforage';
import about from './components/about.vue';
import logout from './components/logout.vue';
import spaces from './components/spaces.vue';
import space from './components/space.vue';
import login from './components/login.vue';
import error from './components/error.vue';
import help from './components/help.vue';
import contact from './components/contact.vue';
import Announcements from './components/views/Announcements.vue';

import store from './store';

const parseToken = async (to, from, next) => {
  if (to.query && to.query.token) {
    await localForage.setItem('feathers-jwt', to.query.token);
    store
      .dispatch('auth/authenticate')
      .then((response) => {
        const redirect = window.sessionStorage.getItem('redirect');
        if (redirect) {
          const path = window.sessionStorage.getItem('path');
          window.sessionStorage.clear();
          next(path);
          // this.$router.push(path);
        } else {
          next('/spaces');
        }
      })
      .catch((error) => {
        next('/');
      });
  } else {
    next('/error');
  }
};

const checkAuth = (to, from, next) => {
  store
    .dispatch('auth/authenticate')
    .then((response) => {
      next();
    })
    .catch((error) => {
      window.sessionStorage.setItem('redirect', true);
      window.sessionStorage.setItem('path', to.path);
      next({
        path: '/login',
      });
    });
};

const routes = [
  {
    path: '/',
    component: about,
  },
  {
    path: '/about',
    component: about,
  },
  {
    path: '/announcements',
    component: Announcements,
  },
  {
    path: '/space/:space',
    component: space,
    props: true,
    beforeEnter: checkAuth,
  },
  {
    path: '/spaces',
    component: spaces,
    beforeEnter: checkAuth,
  },
  {
    path: '/logout',
    component: logout,
  },
  {
    path: '/login',
    component: login,
  },
  {
    path: '/error',
    component: error,
  },
  {
    path: '/help',
    component: help,
  },
  {
    path: '/contact',
    component: contact,
  },
  {
    path: '/callback',
    beforeEnter: parseToken,
  },
];

const linkActiveClass = 'sidebar__item--selected';

const router = new VueRouter({
  routes,
  linkActiveClass,
});

export default router;
