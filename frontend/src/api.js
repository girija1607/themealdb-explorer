// frontend/src/api.js

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export async function getHealth() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) {
    throw new Error("Health check failed");
  }
  return res.json();
}

export async function searchMeals(query) {
  const res = await fetch(`${API_BASE}/meals/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to search meals");
  return res.json(); // { query, count, meals: [...] }
}

export async function fetchRandomMeal() {
  const res = await fetch(`${API_BASE}/meals/random`);
  if (!res.ok) throw new Error("Failed to fetch random meal");
  return res.json(); // { meal }
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json(); // { count, categories: [...] }
}

export async function fetchMealsByCategory(name) {
  const res = await fetch(`${API_BASE}/meals/category/${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error("Failed to fetch meals by category");
  return res.json(); // { category, count, meals: [...] }
}

export async function fetchMealDetail(id) {
  const res = await fetch(`${API_BASE}/meals/${id}`);
  if (!res.ok) throw new Error("Failed to fetch meal detail");
  return res.json(); // { meal }
}
