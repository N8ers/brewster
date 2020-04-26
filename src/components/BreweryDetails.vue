<template>
  <v-card max-width="450" class="mx-auto">
    <v-card-title>{{ brewery.name }}</v-card-title>
    <v-card-subtitle>what do they brew: {{ brewery.brewery_type }}</v-card-subtitle>

    <v-simple-table>
      <tbody>
        <tr>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>address:</td>
          <td>
            {{ brewery.street }} {{ brewery.city }}, {{ brewery.state }}
            {{ brewery.postal_code }}
          </td>
        </tr>
        <tr>
          <td>endoded uri:</td>
          <td>
            <a :href="encodedURI" target="_blank">{{ brewery.street }}</a>
          </td>
        </tr>
        <tr>
          <td>website:</td>
          <td>
            <a :href="brewery.website_url" target="_blank">
              {{
              brewery.website_url
              }}
            </a>
          </td>
        </tr>
        <tr>
          <td>phone:</td>
          <td>{{ formatPhone(brewery.phone) }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-btn :to="{ name: 'find' }" class="ma-2 white--text" color="#f6d465">
      <v-icon dark left>mdi-arrow-left</v-icon>Back
    </v-btn>
    <v-btn v-if="isFavorited" @click="unfavoriteBrewery">
      <v-icon left>mdi-star</v-icon>Unfavorite
    </v-btn>
    <v-btn v-if="!isFavorited" @click="favoriteBrewery">
      <v-icon left>mdi-star</v-icon>Favorite
    </v-btn>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      encodedURI: "",
      brewery: {},
      isFavorited: null
    };
  },
  methods: {
    ...mapActions("firebase_db", [
      "addBreweryToFavorites",
      "isFavoritedBrewery",
      "deleteFavoriteBrewery"
    ]),
    favoriteBrewery() {
      this.addBreweryToFavorites(this.brewery.id).then(() => {
        this.isFavorited = true;
      });
    },
    unfavoriteBrewery() {
      this.deleteFavoriteBrewery(this.brewery.id).then(() => {
        this.isFavorited = false;
      });
    },
    formatPhone: function(number) {
      if (number && number.length == 10) {
        let areaCode = number.substr(0, 3);
        let firstThree = number.substr(3, 3);
        let lastFour = number.substr(6);
        return `(${areaCode})${firstThree}-${lastFour}`;
      }
      return number;
    },
    uriEncoder: function() {
      let address = `${this.brewery.street} ${this.brewery.city} ${this.brewery.state} ${this.brewery.zip}`;
      this.encodedURI = encodeURI(
        `https://www.google.com/maps/search/?api=1&query=${address}`
      );
    }
  },
  created() {
    this.uriEncoder();
    if (this.$route.params.breweryid) {
      axios
        .get(
          `https://api.openbrewerydb.org/breweries/${this.$route.params.breweryid}`
        )
        .then(response => {
          this.brewery = response.data;
        })
        .then(() => this.uriEncoder());
      // .catch(error => {
      // console.log("no dice... ", error);
      // });
    } else {
      alert("no brewery found");
    }
  },
  mounted() {
    this.isFavoritedBrewery(this.$route.params.breweryid).then(
      response => (this.isFavorited = response)
    );
  }
};
</script>

<style></style>
