import * as firebase from "firebase/app";
import "firebase/firebase-firestore";

const mutations = {
  SET_FAVORITE_BREWERIES(state, breweries) {
    state.favoriteBreweries = breweries;
  }
};

const actions = {
  async fetchFavoriteBreweryIds({ rootState, dispatch }) {
    if (rootState.user.uid != "") {
      let breweryIds = await firebase
        .firestore()
        .collection("userid")
        .doc(rootState.user.uid)
        .get()
        .then(doc => doc.data().favorites);

      console.log("brewery ids! ", breweryIds);

      dispatch("/breweries_db/getBreweriesById", breweryIds, { root: true });
    }
  }
};

export default {
  namespaced: true,
  actions,
  mutations
};
