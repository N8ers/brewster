<template>
  <v-app-bar app>
    <router-link class="icon" to="/">
      <img class="icon" src="../assets/icon.png" />
    </router-link>
    <router-link class="icon" to="/">
      <v-toolbar-title class="brand">Brewster</v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>
    <router-link class="find-container" to="/find">
      <v-btn color="#f6d465" class="white--text">find</v-btn>
    </router-link>
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
</style>
