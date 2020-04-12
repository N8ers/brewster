<template>
  <div class="favorites-container">
    <h1>This is a list of breweries that you've favorited!</h1>
    <BreweriesTable :breweries="favoriteBreweries" />
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
    ...mapState(["user", "favoriteBreweries"])
  },
  methods: {
    ...mapActions(["fetchFavoriteBreweryIds"])
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
