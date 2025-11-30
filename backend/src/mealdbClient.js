// backend/src/mealdbClient.js
import axios from "axios";
import { cache } from "./cache.js";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

async function fetchWithCache(url) {
  const cached = cache.get(url);
  if (cached) {
    // console.log("Serving from cache:", url);
    return cached;
  }

  const response = await axios.get(url);
  cache.set(url, response.data);
  return response.data;
}

export async function searchMealsByName(query) {
  const url = `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`;
  return fetchWithCache(url);
}

export async function getRandomMeal() {
  const url = `${BASE_URL}/random.php`;
  return fetchWithCache(url);
}

export async function getCategories() {
  const url = `${BASE_URL}/categories.php`;
  return fetchWithCache(url);
}

export async function getMealsByCategory(category) {
  const url = `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`;
  return fetchWithCache(url);
}

export async function getMealById(id) {
  const url = `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`;
  return fetchWithCache(url);
}
