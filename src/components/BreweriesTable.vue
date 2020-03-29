<template>
  <div class="results">
    <div v-if="breweries.length <= 0">
      <p>type in a city above to find local brews!</p>
      <p
        v-if="noResults"
        class="error-message"
      >yooo... doesn't look like there are any breweries here...</p>
    </div>
    <v-progress-circular v-if="isLoading" indeterminate color="primary"></v-progress-circular>
    <div v-if="breweries.length > 0">
      <h4>BREWERIES</h4>
      <br />
      <v-simple-table v-if="breweries.length > 0" fixed-header height="40vh">
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
            <td class="text-left">
              {{ brewery.street ? brewery.street : "address unavailable" }}
              <!-- : we should use a filter address, to open google maps or some shit -->
            </td>
            <td class="text-left">{{ brewery.state }}</td>
            <td class="text-left">
              <a :href="brewery.website_url" target="_blank">
                {{
                brewery.website_url
                ? formatURL(brewery.website_url)
                : "no website available"
                }}
                <!-- also, maybe a method/computed to remove the 'http://www.' to save on space -->
                <!-- : we should use a method/computed website_url or something to make this an anchor tag -->
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
    // formatURL should probably be a helper or getter or something
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
</style>
