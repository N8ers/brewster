<template>
  <div>
    <form>
      <label>city:</label>
      <input v-model="city" class="city" type="text" />

      <v-btn
        type="submit"
        @click.prevent="findBreweries()"
        color="#f6d465"
        class="white--text ma-2"
      >find</v-btn>
      <br />
      <br />
      <div class="explore">
        <span>explore popular cities:</span>
        <br />
        <v-btn
          x-small
          type="submit"
          @click.prevent="findBreweries('san diego')"
          color="#f6d465"
          class="white--text ma-2"
        >San Diego</v-btn>
        <v-btn
          x-small
          type="submit"
          @click.prevent="findBreweries('kalamazoo')"
          color="#f6d465"
          class="white--text ma-2"
        >Kalamazoo</v-btn>
        <v-btn
          x-small
          type="submit"
          @click.prevent="findBreweries('indianapolis')"
          color="#f6d465"
          class="white--text ma-2"
        >Indy</v-btn>
        <v-btn
          x-small
          type="submit"
          @click.prevent="findBreweries('boulder')"
          color="#f6d465"
          class="white--text ma-2"
        >Boulder</v-btn>
        <v-btn
          x-small
          type="submit"
          @click.prevent="findBreweries('seattle')"
          color="#f6d465"
          class="white--text ma-2"
        >seattle</v-btn>
      </div>
      <!-- we could also add a search by brewery name... -->
      <!-- https://www.openbrewerydb.org/documentation/04-autocomplete  -->
      <!-- <p v-if="this.apiError" class="error-message">
        yooo... there was an api error, did you type in a real city???
        <br />this would be a good candidate for a mixin!
      </p>
      <p v-if="this.noResults" class="error-message">
        yooo... doesn't look like there are any breweries here...
        <br />this would be a good candidate for a mixin!
      </p>-->
    </form>
    <br />
    <BreweriesTable :breweries="breweries" :isLoading="isLoading" />
  </div>
</template>

<script>
// import axios from "axios";
import BreweriesTable from "./BreweriesTable";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    BreweriesTable
  },
  data() {
    return {
      city: ""
    };
  },
  methods: {
    ...mapActions(["getBreweriesByCity"]),
    findBreweries: function(city = this.city) {
      this.getBreweriesByCity(city);
    }
  },
  computed: { ...mapState(["breweries", "isLoading"]) }
};
</script>

<style scoped>
form {
  background-color: white;
  color: #f6d465;
  width: 60%;
  margin: 0 auto;
  top: 20px;
  padding: 30px;
  text-align: center;
}
.city {
  border: 1px solid black;
}
.explore {
  border: 1px solid black;
}
.error-message {
  color: red;
}
.results {
  background-color: white;
  color: #f6d465;
  width: 80%;
  margin: 0 auto;
  top: 20px;
  padding: 30px;
  text-align: center;
}
</style>
