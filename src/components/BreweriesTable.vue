<template>
  <div class="results">
    <div>
      <h4>BREWERIES</h4>
      <br />
      <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="primary"
      ></v-progress-circular>
      <v-simple-table fixed-header height="40vh">
        <thead>
          <tr>
            <th class="text-left">Brewery</th>
            <th class="text-left">Address</th>
            <th class="text-left">State</th>
            <th class="text-left">Website</th>
            <th class="text-left" v-if="hasDeleteOption">Unfavorite</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="brewery in breweries" :key="brewery.id">
            <td
              @click="goToBrewery(brewery.id)"
              v-bind:style="{ cursor: 'pointer' }"
              class="text-left"
            >
              {{ brewery.name }}
            </td>

            <td
              @click="goToBrewery(brewery.id)"
              v-bind:style="{ cursor: 'pointer' }"
              class="text-left"
            >
              {{ brewery.street ? brewery.street : "address unavailable" }}
            </td>

            <td
              @click="goToBrewery(brewery.id)"
              v-bind:style="{ cursor: 'pointer' }"
              class="text-left"
            >
              {{ brewery.state }}
            </td>

            <td class="text-left">
              <a :href="brewery.website_url" target="_blank">
                {{
                  brewery.website_url
                    ? formatURL(brewery.website_url)
                    : "no website available"
                }}
              </a>
            </td>

            <td
              v-if="hasDeleteOption"
              v-bind:style="{ cursor: 'pointer' }"
              @click="removeFavoritedBrewery(brewery)"
            >
              <v-icon left>mdi-delete</v-icon>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    breweries: Array,
    hasDeleteOption: {
      type: Boolean,
      default: false,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    ...mapActions("firebase_db", [
      "deleteFavoriteBrewery",
      "fetchFavoriteBreweryIds"
    ]),
    goToBrewery: function(id) {
      this.$router.push({ name: "brewerydetails", params: { breweryid: id } });
    },
    removeFavoritedBrewery(brewery) {
      this.deleteFavoriteBrewery(brewery.id);
    },
    formatURL: function(url) {
      let shortURL = "";

      if (url.substr(0, 5) == "http:") {
        shortURL = url.substr(11);
      } else if (url.substr(0, 5) == "https") {
        shortURL = url.substr(12);
      } else {
        return url;
      }
      return shortURL;
    }
  },
  computed: {
    ...mapState(["noResults", "breweries_db"])
  },
  created: function() {
    this.fetchFavoriteBreweryIds;
  }
};
</script>

<style>
.error-message {
  color: red;
}
.results {
  margin: 0 auto;
  width: 50%;
}
</style>
