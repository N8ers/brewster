<template>
  <div class="home-container">
    <div v-if="auth.user.username">
      <h1 class="welcome-back">Welcome back, {{ auth.user.username }}</h1>
      <hr />
      <br />
    </div>
    <h2 class="welcome-message">Find breweries wherever you are</h2>
    <br />
    <p class="message-body">
      Using the latest in fermenting algorithms and map analytics Brewster can
      help you find a brewery just down the road or miles away. Buy local. Drink
      local.
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  props: {},
  computed: {
    ...mapState(["auth"])
  },
  methods: {}
};
</script>

<style scoped>
.welcome-back {
  color: #263f44;
}
.welcome-message {
  color: #263f44;
}
.message-body {
  color: #263f44;
}
.home-container {
  border-radius: 10px;
  background-color: #fff1cf;
  color: #120136;
  width: 60%;
  margin: 0 auto;
  top: 20px;
  padding: 30px;
}
</style>
