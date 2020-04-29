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
    // console.log("SET_USER fired");
    state.loggedIn = true;
    state.user.email = user.email;
    state.user.username = user.displayName;
    state.user.uid = user.uid;
  },
  LOG_OUT(state) {
    // console.log("LOG_OUT fired");
    state.loggedIn = false;
    state.user = {};
  }
};

const actions = {
  async login(context, user) {
    // console.log("login action user: ", user);
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(user.email, user.password)
          .then(response => response);
      });
    // .catch(error => {
    // console.log("there was a problem authenticating user: ", error);
    // });
  },
  async fetchCurrentUser({ commit }) {
    await firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        commit("SET_USER", firebaseUser);
      } else {
        // console.log("not logged in");
      }
    });
  },
  async logout({ commit }) {
    // console.log("fired");
    firebase.auth().signOut();
    // .catch(error => console.log("error: ", error));
    commit("LOG_OUT");
  },
  async signup({ dispatch }, user) {
    // create user
    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);

    // add display name to user
    await firebase.auth().currentUser.updateProfile({ displayName: user.name });

    // initialize database w/ uid, and empty array
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
