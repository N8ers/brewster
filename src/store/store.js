import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

import breweries_db from "./modules/breweries";
import firebase_db from "./modules/firebase_db";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    breweries_db,
    firebase_db
  },
  state: {
    user: {
      email: "",
      username: "",
      uid: ""
    },
    loggedIn: false,
    // breweries: [],
    // citiesBreweries: [],
    favoriteBreweryIds: [],
    favoriteBreweries: [],
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
    // SET_BREWERIES_BY_CITY(state, breweries) {
    //   state.breweries = breweries;
    // },
    IS_LOADING(state, setTo) {
      console.log("IS_LOADING fired");
      state.isLoading = setTo;
    },
    SET_NO_RESULTS(state, setTo) {
      console.log("SET_NO_RESULTS fired");
      state.noResults = setTo;
    },
    // SET_FAVORITE_BREWERIES(state, breweries) {
    //   state.favoriteBreweries = breweries;
    // },
    SET_USER(state, user) {
      console.log("SET_USER fired");
      state.loggedIn = true;
      state.user.email = user.email;
      state.user.username = user.displayName;
      state.user.uid = user.uid;
    },
    LOG_OUT(state) {
      console.log("LOG_OUT fired");
      state.loggedIn = false;
      state.user = {};
    },
    DEAD_COMMIT() {
      // console.log("DEAD_COMMIT hit");
    }
  },
  actions: {
    // getBreweriesByCity({ commit }, city) {
    //   commit("SET_NO_RESULTS", false);
    //   commit("IS_LOADING", true);
    //   commit("SET_BREWERIES_BY_CITY", []);
    //   setTimeout(function() {
    //     return fetchBreweriesByCity(city)
    //       .then(response => {
    //         commit("SET_BREWERIES_BY_CITY", response.data);
    //         console.log(response);
    //         commit("IS_LOADING", false);
    //         if (response.data.length < 1) {
    //           commit("SET_NO_RESULTS", true);
    //         }
    //       })
    //       .catch(error => {
    //         console.log("error loading breweries: ", error);
    //         commit("IS_LOADING", false);
    //       });
    //   }, 1000);
    // },
    // async getBreweriesById({ commit }, breweryIds) {
    //   let favoriteBreweries = await fetchBreweriesById(breweryIds);
    //   commit("SET_FAVORITE_BREWERIES", favoriteBreweries);
    // },
    async logout({ commit }) {
      firebase
        .auth()
        .signOut()
        .catch(error => console.log("error: ", error));
      commit("LOG_OUT");
    },
    async signup({ commit }, user) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      await firebase
        .auth()
        .currentUser.updateProfile({ displayName: user.name });

      commit("DEAD_COMMIT");
    },
    async login({ dispatch }, user) {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          return firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password);
        })
        .catch(error => {
          console.log("there was a problem authenticating user: ", error);
        });

      dispatch("fetchCurrentUser");
    },
    async fetchCurrentUser({ commit }) {
      await firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          commit("SET_USER", firebaseUser);
        } else {
          console.log("not logged in");
        }
      });
    }
    // async fetchFavoriteBreweryIds({ state, dispatch }) {
    //   if (state.user.uid != "") {
    //     let breweryIds = await firebase
    //       .firestore()
    //       .collection("userid")
    //       .doc(state.user.uid)
    //       .get()
    //       .then(doc => doc.data().favorites);

    //     dispatch("getBreweriesById", breweryIds);
    //   }
    // }
  }
});
