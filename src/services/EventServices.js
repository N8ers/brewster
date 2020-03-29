import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.openbrewerydb.org/breweries",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

export default {
  getBreweriesByCity(city) {
    return apiClient.get(`?by_city=${city}`);
  }
};
