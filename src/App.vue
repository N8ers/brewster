<template>
  <v-app>
    <div id="app">
      <Navbar />
      <br />
      <v-content class="body">
        <router-view></router-view>
      </v-content>
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

  data: () => ({
    //
  })
};
</script>

<style scoped>
.body {
  background-color: #f6d465;
  height: 100vh;
}
</style>
