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
      <hr />
      <div>
        <span>explore popular cities:</span>
        <br />
        <span v-for="(city, index) in suggestedCities" :key="`city-${index}`">
          <v-btn
            x-small
            type="submit"
            @click.prevent="findBreweries(city)"
            color="#f6d465"
            class="white--text ma-2"
          >{{ city }}</v-btn>
        </span>
      </div>
    </form>
    <br />
    <BreweriesTable v-if="showTable" :breweries="cityBreweries" :hasDeleteOption="false" />
  </div>
</template>

<script>
import BreweriesTable from "./BreweriesTable";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    BreweriesTable
  },
  data() {
    return {
      city: "",
      showTable: false,
      cityBreweries: []
    };
  },
  methods: {
    ...mapActions("breweries_db", ["getBreweriesByCity"]),
    findBreweries: function(city = this.city) {
      this.showTable = true;
      this.getBreweriesByCity(city).then(breweryData => {
        this.cityBreweries = breweryData;
      });
    }
  },
  computed: {
    ...mapState([
      "breweries_db",
      "isLoading",
      "suggestedCities",
      "citiesBreweries"
    ])
  }
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
