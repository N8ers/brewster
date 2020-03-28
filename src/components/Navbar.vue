<template>
  <v-app-bar app>
    <router-link :to="{ name: 'home' }">
      <img class="icon" src="../assets/icon.png" />
    </router-link>
    <router-link class="icon" :to="{ name: 'home' }">
      <v-toolbar-title to="/" class="brand">Brewster</v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>
    <v-btn :to="{ name: 'auth' }" color="#f6d465" class="white--text">log in</v-btn>
    <v-btn :to="{ name: 'find' }" color="#f6d465" class="white--text">find</v-btn>
  </v-app-bar>
</template>

<script>
export default {};
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
  color: pink;
  background-color: teal;
}
</style>
