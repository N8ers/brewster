<template>
  <div>
    <form>
      <p>where are you now?</p>
      <label>city:</label>
      <input v-model="city" class="city" type="text" />
      <br />
      <br />
      <v-btn
        type="submit"
        @click.prevent="sandiegoBreweries"
        color="#f6d465"
        class="white--text"
      >San Diego</v-btn>
      <v-btn type="submit" @click.prevent="indyBreweries" color="#f6d465" class="white--text">Indy</v-btn>
      <v-btn type="submit" @click.prevent="findBreweries" color="#f6d465" class="white--text">find</v-btn>
      <!-- we could also add a search by brewery name... -->
      <!-- https://www.openbrewerydb.org/documentation/04-autocomplete  -->
      <br />
      <p v-if="this.apiError" class="error-message">
        yooo... there was an api error, did you type in a real city???
        <br />this would be a good candidate for a mixin!
      </p>
      <p v-if="this.noResults" class="error-message">
        yooo... doesn't look like there are any breweries here...
        <br />this would be a good candidate for a mixin!
      </p>
    </form>
    <br />
    <div v-if="findTriggred" class="results">
      <h4>BREWERIES</h4>
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
import axios from "axios";
export default {
  data() {
    return {
      city: "",
      findTriggred: false,
      breweries: [],
      apiError: false,
      noResults: false
    };
  },
  // should i be using a computed property for this?
  methods: {
    findBreweries: function() {
      let city = this.city;
      this.findTriggred = !this.findTriggred;
      this.apiError = false;
      axios
        .get(`https://api.openbrewerydb.org/breweries?by_city=${city}`)
        .then(response => {
          this.findTriggred = true;
          this.breweries = response.data;
          this.apiError = false;
          this.noResults = false;
        })
        .catch(error => {
          console.log("something went wrong: ", error);
          this.apiError = true;
          this.findTriggred = false;
        });
      if (this.breweries.length === 0) {
        this.noResults = true;
        this.findTriggred = false;
      }
    },
    formatURL: function(url) {
      // console.log(url);
      let shortURL = "";

      if (url.substr(0, 5) == "http:") {
        shortURL = url.substr(11);
      } else if (url.substr(0, 5) == "https") {
        shortURL = url.substr(12);
      } else {
        return url;
      }
      return shortURL;
    },
    goToBrewery: function(id) {
      this.$router.push({ name: "brewerydetails", params: { breweryid: id } });
    },
    indyBreweries: function() {
      this.city = "indianapolis";
      this.findBreweries();
    },
    sandiegoBreweries: function() {
      this.city = "San Diego";
      this.findBreweries();
    }
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
