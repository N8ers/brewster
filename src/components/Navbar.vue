<template>
  <v-app-bar app>
    <router-link :to="{ name: 'home' }">
      <img class="icon" src="../assets/icon.png" />
    </router-link>
    <router-link class="icon" :to="{ name: 'home' }">
      <v-toolbar-title to="/" class="brand">Brewster</v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>

    <v-btn :to="{ name: 'find' }" color="#f6d465" class="white--text ma-2">find</v-btn>
    <v-btn
      v-if="auth.loggedIn"
      :to="{ name: 'favorites' }"
      color="#f6d465"
      class="white--text ma-2"
    >favorites</v-btn>
    <v-btn
      v-if="!auth.loggedIn"
      :to="{ name: 'auth' }"
      color="#f6d465"
      class="white--text ma-2"
    >log in</v-btn>
    <v-btn v-if="auth.loggedIn" @click="logout" color="#f6d465" class="white--text ma-2">log out</v-btn>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    logout: function() {
      this.$store.dispatch("auth/logout", null, { root: true }).then(() => {
        if (this.$router.currentRoute.name !== "home") {
          this.$router.push({ name: "home" });
        }
      });
    }
  },
  computed: {
    ...mapState(["auth"])
  }
};
</script>

<style scoped>
.icon {
  height: 50px;
}
.brand {
  color: #f6d465;
  margin-top: -6px;
  margin-left: 10px;
  font-size: 2.5em;
}
a {
  text-decoration: none;
}
.router-link-exact-active {
  /* color: pink; */
  /* background-color: teal; */
}
</style>
