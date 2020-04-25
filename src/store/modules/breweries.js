import {
  fetchBreweriesByCity,
  fetchBreweriesById,
} from "../../services/EventServices";

const mutations = {
  SET_BREWERIES_BY_CITY(state, breweries) {
    state.citiesBreweries = breweries;
  },
};

const actions = {
  async getBreweriesById(contexts, breweryIds) {
    let favoriteBreweries = await fetchBreweriesById(breweryIds);
    return favoriteBreweries;
  },
  async getBreweriesByCity({ commit }, city) {
    let cityBreweries = await fetchBreweriesByCity(city);
    await commit("SET_BREWERIES_BY_CITY", cityBreweries);
    return cityBreweries;
  },
};

export default {
  namespaced: true,
  actions,
  mutations,
};
