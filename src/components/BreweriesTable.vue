<template>
  <div class="results">
    <v-progress-circular v-if="isLoading" indeterminate color="primary"></v-progress-circular>
    <div>
      <h4>BREWERIES</h4>
      <br />
      <v-simple-table fixed-header height="40vh">
        <thead>
          <tr>
            <th class="text-left">Brewery</th>
            <th class="text-left">Address</th>
            <th class="text-left">State</th>
            <th class="text-left">Website</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="brewery in breweries"
            :key="brewery.id"
            @click="goToBrewery(brewery.id)"
            v-bind:style="{ cursor: 'pointer' }"
          >
            <td class="text-left">{{ brewery.name }}</td>
            <td class="text-left">{{ brewery.street ? brewery.street : "address unavailable" }}</td>
            <td class="text-left">{{ brewery.state }}</td>
            <td class="text-left">
              <a :href="brewery.website_url" target="_blank">
                {{
                brewery.website_url
                ? formatURL(brewery.website_url)
                : "no website available"
                }}
              </a>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    breweries: Array,
    isLoading: Boolean
  },
  methods: {
    goToBrewery: function(id) {
      this.$router.push({ name: "brewerydetails", params: { breweryid: id } });
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
    ...mapState(["noResults"])
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
