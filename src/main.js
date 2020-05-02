import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import * as firebase from "firebase/app";
import "firebase/auth";
import VueAnalytics from "vue-analytics";

Vue.use(VueAnalytics, {
  id: "G-54PNGG36Q8"
});

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyAw5YwIsToLaTwj0sWq84rJLB4PhzVAWzk",
  authDomain: "brewster-c62ae.firebaseapp.com",
  databaseURL: "https://brewster-c62ae.firebaseio.com",
  projectId: "brewster-c62ae",
  storageBucket: "brewster-c62ae.appspot.com",
  messagingSenderId: "1008545313989",
  appId: "1:1008545313989:web:ab5c9f9b9839d19df56cac",
  measurementId: "G-54PNGG36Q8"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  created() {
    // console.log("main.js CREATED!");
    this.$store.dispatch("auth/fetchCurrentUser");
  },
  render: h => h(App)
}).$mount("#app");
