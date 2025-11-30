// backend/src/server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import {
  searchMealsByName,
  getRandomMeal,
  getCategories,
  getMealsByCategory,
  getMealById
} from "./mealdbClient.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "TheMealDB Explorer backend is running" });
});
// GET /api/meals/search?query=chicken
app.get("/api/meals/search", async (req, res) => {
  const query = (req.query.query || "").trim();
  if (!query) {
    return res.status(400).json({ error: "query parameter is required" });
  }

  try {
    const data = await searchMealsByName(query);
    res.json({
      query,
      count: data.meals ? data.meals.length : 0,
      meals: data.meals || []
    });
  } catch (err) {
    console.error(err.message);
    res.status(502).json({ error: "Failed to fetch from TheMealDB" });
  }
});

// GET /api/meals/random
app.get("/api/meals/random", async (req, res) => {
  try {
    const data = await getRandomMeal();
    res.json({ meal: data.meals?.[0] || null });
  } catch (err) {
    console.error(err.message);
    res.status(502).json({ error: "Failed to fetch random meal" });
  }
});

// GET /api/categories
app.get("/api/categories", async (req, res) => {
  try {
    const data = await getCategories();
    res.json({
      count: data.categories?.length || 0,
      categories: data.categories || []
    });
  } catch (err) {
    console.error(err.message);
    res.status(502).json({ error: "Failed to fetch categories" });
  }
});

// GET /api/meals/category/:name
app.get("/api/meals/category/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const data = await getMealsByCategory(name);
    res.json({
      category: name,
      count: data.meals?.length || 0,
      meals: data.meals || []
    });
  } catch (err) {
    console.error(err.message);
    res.status(502).json({ error: "Failed to fetch meals for this category" });
  }
});

// GET /api/meals/:id
app.get("/api/meals/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await getMealById(id);
    if (!data.meals || data.meals.length === 0) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.json({ meal: data.meals[0] });
  } catch (err) {
    console.error(err.message);
    res.status(502).json({ error: "Failed to fetch meal details" });
  }
});



// 404 route (agar upar ke kisi route se match na ho)
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Global error handler (future me kaam ayega)
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
