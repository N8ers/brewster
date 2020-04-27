<template>
  <div class="favorites-container">
    <h1>This is a list of breweries that you've favorited!</h1>
    <BreweriesTable
      :isLoading="isLoading"
      :breweries="firebase_db.favoriteBreweries"
      :hasDeleteOption="true"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import BreweriesTable from "./BreweriesTable";
export default {
  data() {
    return {
      isLoading: false
    };
  },
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
    this.isLoading = true;
    this.fetchFavoriteBreweryIds();
    this.isLoading = false;
  }
};
</script>

<style scoped>
.favorites-container {
  text-align: center;
}
</style>
