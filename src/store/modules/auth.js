import * as firebase from "firebase/app";
import "firebase/auth";

const state = {
  loggedIn: false,
  user: {
    email: "",
    username: "",
    uid: ""
  }
};

const mutations = {
  SET_USER(state, user) {
    state.loggedIn = true;
    state.user.email = user.email;
    state.user.username = user.displayName;
    state.user.uid = user.uid;
  },
  LOG_OUT(state) {
    state.loggedIn = false;
    state.user = {};
  }
};

const actions = {
  async login(context, user) {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(user.email, user.password)
          .then(response => response);
      });
  },
  async fetchCurrentUser({ commit }) {
    await firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        commit("SET_USER", firebaseUser);
      }
    });
  },
  async logout({ commit }) {
    firebase.auth().signOut();
    commit("LOG_OUT");
  },
  async signup({ dispatch }, user) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);

    await firebase.auth().currentUser.updateProfile({ displayName: user.name });

    dispatch("firebase_db/alocateDbResourcesForNewUser", state.user.uid, {
      root: true
    });
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
