import * as firebase from "firebase/app";
import "firebase/firebase-firestore";

const state = {
  favoriteBreweryIds: [],
  favoriteBreweries: [],
};

const mutations = {
  SET_FAVORITE_BREWERIES(state, breweries) {
    state.favoriteBreweries = breweries;
  },
  SET_FAVORITE_BREWERIES_IDS(state, breweryIds) {
    state.favoriteBreweryIds = breweryIds;
  },
};

const actions = {
  async fetchFavoriteBreweryIds({ rootState, dispatch, commit }) {
    if (rootState.auth.user.uid != "") {
      let breweryIds = await firebase
        .firestore()
        .collection("userid")
        .doc(rootState.auth.user.uid)
        .get()
        .then((doc) => doc.data().favorites);

      commit("SET_FAVORITE_BREWERIES_IDS", breweryIds);

      dispatch("breweries_db/getBreweriesById", breweryIds, {
        root: true,
      }).then((breweriesData) => {
        commit("SET_FAVORITE_BREWERIES", breweriesData);
      });
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
