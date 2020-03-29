import Vue from "vue";
import Vuex from "vuex";
import EventServices from "../services/EventServices";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    breweries: [],
    isLoading: false
  },
  mutations: {
    SET_BREWERIES_BY_CITY(state, breweries) {
      state.breweries = breweries;
    },
    IS_LOADING(state, setTo) {
      state.isLoading = setTo;
    }
  },
  actions: {
    getBreweriesByCity({ commit }, city) {
      commit("IS_LOADING", true);
      commit("SET_BREWERIES_BY_CITY", []);
      setTimeout(function() {
        return EventServices.getBreweriesByCity(city)
          .then(response => {
            commit("SET_BREWERIES_BY_CITY", response.data);
            commit("IS_LOADING", false);
          })
          .catch(error => {
            console.log("error loading breweries: ", error);
            commit("IS_LOADING", false);
          });
      }, 1000);
    }
  },
  modules: {}
});
