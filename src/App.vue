<template>
  <v-app>
    <div id="app">
      <Navbar />
      <br />
      <v-main class="body">
        <router-view></router-view>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",

  components: {
    Navbar
  },

  data: () => ({})
};
</script>

<style scoped>
body,
html,
#app {
  min-height: 100%;
  background-color: #ffd369;
}
.footer {
  bottom: 10px;
}
</style>
