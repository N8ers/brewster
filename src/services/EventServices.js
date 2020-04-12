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

export function fetchBreweriesByCity(city) {
  return apiClient.get(`?by_city=${city}`);
}

export async function fetchBreweriesById(ids) {
  let breweries = [];

  for (let i = 0; i < ids.length; i++) {
    let brewery = await apiClient.get(`/${ids[i]}`);
    breweries.push(brewery.data);
  }

  return breweries;
}
