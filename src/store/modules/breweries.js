import * as firebase from "firebase/app";
import "firebase/firebase-firestore";

import {
  fetchBreweriesByCity,
  fetchBreweriesById
} from "../../services/EventServices";

const mutations = {
  SET_BREWERIES_BY_CITY(state, breweries) {
    console.log("SET_BREWERIES_BY_CITY fired");
    console.log("SET_BREWERIES_BY_CITY state : ", state.citiesBreweries);
    console.log("state.breweries before: ", state.breweries);
    state.citiesBreweries = breweries;
    console.log("state.breweries after: ", state.breweries);
    console.log("SET_BREWERIES_BY_CITY state : ", state.citiesBreweries);
  },
  SET_FAVORITE_BREWERIES(state, breweries) {
    console.log("SET_FAVORITE_BREWERIES fired");
    state.favoriteBreweries = breweries;
  }
};

const actions = {
  async getBreweriesById({ commit }, breweryIds) {
    let favoriteBreweries = await fetchBreweriesById(breweryIds);
    commit("SET_FAVORITE_BREWERIES", favoriteBreweries);
  },
  async fetchFavoriteBreweryIds({ state, dispatch }) {
    if (state.user.uid != "") {
      let breweryIds = await firebase
        .firestore()
        .collection("userid")
        .doc(state.user.uid)
        .get()
        .then(doc => doc.data().favorites);

      dispatch("getBreweriesById", breweryIds);
    }
  },
  getBreweriesByCity({ commit }, city) {
    // commit("SET_NO_RESULTS", false);
    commit("IS_LOADING", true);
    // commit("SET_BREWERIES_BY_CITY", []);
    setTimeout(function() {
      return fetchBreweriesByCity(city)
        .then(response => {
          commit("SET_BREWERIES_BY_CITY", response.data);
          console.log("getBreweriesByCity: ", response.data);
          commit("IS_LOADING", false);
          // if (response.data.length < 1) {
          //   commit("SET_NO_RESULTS", true);
          // }
        })
        .catch(error => {
          console.log("error loading breweries: ", error);
          commit("IS_LOADING", false);
        });
    }, 1000);
  }
};

export default {
  actions,
  mutations
};
