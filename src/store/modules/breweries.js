import {
  fetchBreweriesByCity,
  fetchBreweriesById
} from "../../services/EventServices";

const mutations = {
  SET_BREWERIES_BY_CITY(state, breweries) {
    state.citiesBreweries = breweries;
  }
};

const actions = {
  async getBreweriesById({ commit }, breweryIds) {
    let favoriteBreweries = await fetchBreweriesById(breweryIds);
    commit("SET_FAVORITE_BREWERIES", favoriteBreweries);
  },
  async getBreweriesByCity({ commit }, city) {
    commit("IS_LOADING", true);
    let cityBreweries = await fetchBreweriesByCity(city);
    commit("SET_BREWERIES_BY_CITY", cityBreweries);
    commit("IS_LOADING", false);
  }
};

export default {
  namespaced: true,
  actions,
  mutations
};
