import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase/app";
import "firebase/auth";
import EventServices from "../services/EventServices";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    loggedIn: false,
    breweries: [],
    isLoading: false,
    noResults: false,
    suggestedCities: [
      "san diego",
      "kalamazoo",
      "indianapolis",
      "boulder",
      "seattle",
    ],
  },
  mutations: {
    SET_BREWERIES_BY_CITY(state, breweries) {
      state.breweries = breweries;
    },
    IS_LOADING(state, setTo) {
      state.isLoading = setTo;
    },
    SET_NO_RESULTS(state, setTo) {
      state.noResults = setTo;
    },
    SET_USER(state, user) {
      state.loggedIn = true;
      state.user.email = user.email;
      state.user.username = user.displayName;
      state.user.uid = user.uid;
    },
    LOG_OUT(state) {
      state.loggedIn = false;
      state.user = {};
    },
    DEAD_COMMIT() {
      console.log("DEAD_COMMIT hit");
    },
  },
  actions: {
    getBreweriesByCity({ commit }, city) {
      commit("SET_NO_RESULTS", false);
      commit("IS_LOADING", true);
      commit("SET_BREWERIES_BY_CITY", []);
      setTimeout(function() {
        return EventServices.getBreweriesByCity(city)
          .then((response) => {
            commit("SET_BREWERIES_BY_CITY", response.data);
            console.log(response);
            commit("IS_LOADING", false);
            if (response.data.length < 1) {
              commit("SET_NO_RESULTS", true);
            }
          })
          .catch((error) => {
            console.log("error loading breweries: ", error);
            commit("IS_LOADING", false);
          });
      }, 1000);
    },
    logout({ commit }) {
      firebase
        .auth()
        .signOut()
        .catch((error) => console.log("error: ", error));
      commit("LOG_OUT");
    },
    fakeLogin({ commit }) {
      commit("LOG_IN");
    },
    async signup({ commit }, user) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      await firebase
        .auth()
        .currentUser.updateProfile({ displayName: user.name });

      commit("DEAD_COMMIT");
    },
    async login({ dispatch }, user) {
      console.log("user", user);
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          return firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(() => {
              console.log("all of the auth worked?");
              dispatch("fetchCurrentUser");
            });
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
        });
    },
    async fetchCurrentUser({ commit }) {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit("SET_USER", user);
        } else {
          console.log("no dice, signed out");
        }
      });
    },
  },
  modules: {},
});
