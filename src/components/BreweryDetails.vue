<template>
  <v-card max-width="450" class="mx-auto">
    <v-card-title>{{ brewery.name }}</v-card-title>
    <v-card-subtitle
      >what do they brew: {{ brewery.brewery_type }}</v-card-subtitle
    >
    <v-card-text>
      address: {{ brewery.street }} {{ brewery.city }}, {{ brewery.state }}
      {{ brewery.postal_code }}
      <br />
      website: {{ brewery.website_url }} <br />phone: {{ brewery.phone }}
    </v-card-text>
    <v-btn :to="{ name: 'find' }" class="ma-2 white--text" color="#f6d465">
      <v-icon dark left>mdi-arrow-left</v-icon>Back
    </v-btn>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      brewery: {}
    };
  },
  created() {
    if (this.$route.params.breweryid) {
      axios
        .get(
          `https://api.openbrewerydb.org/breweries/${this.$route.params.breweryid}`
        )
        .then(response => {
          console.log("success: ", response.data);
          this.brewery = response.data;
        })
        .catch(error => {
          console.log("no dice... ", error);
        });
    } else {
      alert("no brewery found");
    }
  }
};
</script>

<style></style>
