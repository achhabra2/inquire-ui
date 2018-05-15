import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import feathersVuex from 'feathers-vuex';
import feathersClient from './feathersClient';

import config from './config';

const { service, auth } = feathersVuex(feathersClient, { idField: '_id' });

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAuthenticated: false,
    baseUrl: '',
    currentUser: {},
    userSpaces: [],
    userSpacesLoaded: false,
    apiUrl: '',
    api: feathersClient,
    sideBarActive: false,
  },
  actions: {
    init(context) {
      const { base } = config;
      const opts = {
        baseUrl: base,
        apiUrl: `${base}/questions/`,
      };
      context.commit('setInit', opts);
    },
    toggleSideBar(context) {
      context.commit('setSideBarState', !context.state.sideBarActive);
    },
    loadUser(context) {
      axios
        .get(context.getters.userUrl, {
          withCredentials: true,
        })
        .then(
          (response) => {
            context.commit('setUser', response.data);
          },
          (err) => {
            console.error(err);
          },
        );
    },
    loadAuthentication(context) {
      axios
        .get(context.getters.authUrl, {
          withCredentials: true,
        })
        .then(
          (response) => {
            context.commit('setAuthentication', response.data.isAuthenticated);
          },
          (err) => {
            console.error(err);
          },
        );
    },
    loadSpaces(context) {
      const url = 'https://api.ciscospark.com/v1/teams/';
      const config = {
        headers: {
          Authorization: `Bearer ${context.state.currentUser.token}`,
        },
      };
      axios
        .get(context.getters.spacesUrl, {
          withCredentials: true,
        })
        .then(
          (response) => {
            const promises = [];
            for (const [index, space] of response.data.entries()) {
              if (space.teamId && !space.teamName) {
                const teamUrl = url + space.teamId;
                promises.push(axios
                    .get(teamUrl, config)
                    .then((team) => {
                      response.data[index].teamName = team.data.name;
                    })
                    .catch((err) => {
                      console.error(err);
                      response.data[index].teamName =
                        'Unauthorized to view team name';
                    }),);
              }
            }
            Promise.all(promises).then(() => {
              context.commit('setSpaces', response.data);
            });
          },
          (err) => {
            console.error(err);
          },
        );
    },
    logOut(context) {
      axios
        .get(context.getters.logoutUrl, {
          withCredentials: true,
        })
        .then(
          (response) => {
            context.commit('setLogout', response.data.loggedOut);
          },
          (err) => {
            console.error(err);
          },
        );
    },
    setSpacesLoading(context) {
      context.commit('setSpacesLoading', true);
    },
  },
  mutations: {
    setSideBarState(state, opts) {
      state.sideBarActive = opts;
    },
    setInit(state, opts) {
      state.baseUrl = opts.baseUrl;
      state.apiUrl = opts.apiUrl;
    },
    setUser: (state, user) => {
      state.currentUser = user;
    },
    setAuthentication: (state, isAuthenticated) => {
      state.isAuthenticated = isAuthenticated;
    },
    setSpaces: (state, response) => {
      state.userSpaces = response;
      state.userSpacesLoaded = true;
    },
    setSpacesLoading: (state, value) => {
      state.userSpacesLoaded = false;
    },
    setLogout: (state, loggedOut) => {
      state.isAuthenticated = !loggedOut;
    },
  },
  getters: {
    authUrl: state => `${state.baseUrl}/auth/isAuthenticated`,
    loginUrl: state => `${state.baseUrl}/auth/ciscospark`,
    logoutUrl: state => `${state.baseUrl}/auth/logout`,
    userUrl: state => `${state.baseUrl}/auth/getUser`,
    spaceUrl: state => `${state.apiUrl}listSpaces`,
    spacesUrl: state => `${state.baseUrl}/spaces`,
  },
  plugins: [
    service('spaces'),
    service('users'),
    service('motds'),
    service('questions'),
    service('feedback'),
    auth({ userService: 'users' }),
  ],
});

export default store;
