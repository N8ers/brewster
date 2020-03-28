import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Find from "../components/Find.vue";
import BreweryDetails from "../components/BreweryDetails.vue";
import Auth from "../components/Auth.vue";

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
