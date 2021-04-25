import * as firebase from "firebase/app";
import "firebase/firebase-firestore";

const state = {
  favoriteBreweryIds: [],
  favoriteBreweries: []
};

const mutations = {
  SET_FAVORITE_BREWERIES(state, breweries) {
    state.favoriteBreweries = breweries;
  },
  SET_FAVORITE_BREWERIES_IDS(state, breweryIds) {
    state.favoriteBreweryIds = breweryIds;
  }
};

const actions = {
  async fetchFavoriteBreweryIds({ rootState, dispatch, commit }) {
    if (rootState.auth.user.uid != "") {
      let breweryIds = await firebase
        .firestore()
        .collection("userid")
        .doc(rootState.auth.user.uid)
        .get()
        .then(doc => doc.data().favorites);

      commit("SET_FAVORITE_BREWERIES_IDS", breweryIds);

      dispatch("breweries_db/getBreweriesById", breweryIds, {
        root: true
      }).then(breweriesData => {
        commit("SET_FAVORITE_BREWERIES", breweriesData);
      });
    }
  },
  async deleteFavoriteBrewery({ rootState, dispatch }, breweryIdToDelete) {
    let oldFavorites = this.state.firebase_db.favoriteBreweryIds;

    let newFavorites = oldFavorites.filter(breweryId => {
      return breweryId != breweryIdToDelete;
    });

    await firebase
      .firestore()
      .collection("userid")
      .doc(rootState.auth.user.uid)
      .update({ favorites: newFavorites });

    dispatch("fetchFavoriteBreweryIds");
  },
  async addBreweryToFavorites({ rootState, dispatch }, newFavoriteBreweryId) {
    let favorites = this.state.firebase_db.favoriteBreweryIds;
    favorites.push(newFavoriteBreweryId);

    await firebase
      .firestore()
      .collection("userid")
      .doc(rootState.auth.user.uid)
      .update({ favorites: favorites });

    dispatch("fetchFavoriteBreweryIds");
  },
  async isFavoritedBrewery(context, breweryId) {
    return this.state.firebase_db.favoriteBreweryIds.includes(breweryId);
  },
  async alocateDbResourcesForNewUser(context, uid) {
    await firebase
      .firestore()
      .collection("userid")
      .doc(uid)
      .set({
        favorites: []
      });
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
