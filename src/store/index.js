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
    LOG_IN(state, data) {
      state.loggedIn = true;
      state.user.email = data.user.email;
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
      commit("LOG_OUT");
    },
    fakeLogin({ commit }) {
      commit("LOG_IN");
    },
    signup({ commit }, user) {
      console.log("newUser: ", user);
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          console.log("SIGNED UP!");
        })
        .catch(function(error) {
          console.log("error!", error);
        });
      commit("DEAD_COMMIT");
    },
    login({ commit }, user) {
      console.log("user", user);
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        // .onAuthStateChange(function(user) {
        //   if (user) {
        //     console.log(user);
        //   }
        // })
        .then((data) => {
          console.log("success!");
          console.log(data);
          commit("LOG_IN", data);
        })
        .catch(function(error) {
          console.log("error: ", error);
        });
    },
  },
  modules: {},
});
