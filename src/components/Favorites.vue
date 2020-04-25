<template>
  <div class="favorites-container">
    <h1>This is a list of breweries that you've favorited!</h1>
    <BreweriesTable :breweries="firebase_db.favoriteBreweries" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import BreweriesTable from "./BreweriesTable";
export default {
  components: {
    BreweriesTable
  },
  computed: {
    ...mapState(["firebase_db"])
  },
  methods: {
    ...mapActions("firebase_db", ["fetchFavoriteBreweryIds"])
  },
  mounted() {
    this.fetchFavoriteBreweryIds();
  }
};
</script>

<style scoped>
.favorites-container {
  text-align: center;
}
</style>
