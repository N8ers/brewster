<template>
  <div class="home-container">
    <div v-if="loggedIn">
      <h2>Welcome back, {{ user.username }}</h2>
      <br />
      <hr />
    </div>
    <h2>Find local breweries in your local area</h2>
    <br />
    <h4>
      using the latest in fermenting algorithms and map analytics Beerski can
      help you find a brewery jus down the road. Buy local. Drink local.
    </h4>
    <br />
    <hr />
    <br />
    <h4>Background Color: #f6d465</h4>
    <h4>To login, navigate to 'LOG IN' button and click "FAKE 'LOG IN'" button</h4>
    <h5>there is a login sanity checker at the center of the nav bar</h5>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Home",
  props: {},
  computed: {
    ...mapState(["loggedIn", "user"])
  },
  methods: {
    ...mapActions(["fetchCurrentUser"])
  },
  created() {
    console.log("created");
    this.fetchCurrentUser();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-container {
  background-color: white;
  color: #f6d465;
  width: 60%;
  margin: 0 auto;
  top: 20px;
  padding: 30px;
}
</style>
