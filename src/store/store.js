import Vue from "vue";
import Vuex from "vuex";

import breweries_db from "./modules/breweries";
import firebase_db from "./modules/firebase_db";
import auth from "./modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    breweries_db,
    firebase_db,
    auth
  },
  state: {
    isLoading: false,
    noResults: false,
    suggestedCities: [
      "san diego",
      "kalamazoo",
      "indianapolis",
      "boulder",
      "seattle"
    ]
  },
  mutations: {
    IS_LOADING(state, setTo) {
      // console.log("IS_LOADING fired");
      state.isLoading = setTo;
    },
    SET_NO_RESULTS(state, setTo) {
      // console.log("SET_NO_RESULTS fired");
      state.noResults = setTo;
    }
  }
});
