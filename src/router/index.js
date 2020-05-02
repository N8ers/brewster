import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Find from "../components/Find.vue";
import BreweryDetails from "../components/BreweryDetails.vue";
import Auth from "../components/Auth.vue";
import CreateAccount from "../components/CreateAccount.vue";
import Favorites from "../components/Favorites.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/find",
    name: "find",
    component: Find
  },
  {
    path: "/auth",
    name: "auth",
    component: Auth
  },
  {
    path: "/createAccount",
    name: "createAccount",
    component: CreateAccount
  },
  {
    path: "/favorites",
    name: "favorites",
    component: Favorites
  },
  {
    path: "/brewery/:breweryid",
    name: "brewerydetails",
    component: BreweryDetails
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
