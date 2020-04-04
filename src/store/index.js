import Vue from "vue";
import Vuex from "vuex";
import EventServices from "../services/EventServices";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    LOG_IN(state) {
      state.loggedIn = true;
    },
    LOG_OUT(state) {
      state.loggedIn = false;
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
    login({ commit }) {
      commit("LOG_IN");
    },
  },
  modules: {},
});
