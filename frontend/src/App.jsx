

// frontend/src/App.jsx
import React, { useEffect, useState } from "react";
import {
  searchMeals,
  fetchCategories,
  fetchMealsByCategory,
  fetchMealDetail,
  fetchRandomMeal
} from "./api.js";
import SearchBar from "./components/SearchBar.jsx";
import CategoryList from "./components/CategoryList.jsx";
import MealGrid from "./components/MealGrid.jsx";
import MealDetail from "./components/MealDetail.jsx";
import RandomMealButton from "./components/RandomMealButton.jsx";

function App() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loadingMeals, setLoadingMeals] = useState(false);
  const [loadingMealDetail, setLoadingMealDetail] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [resultsSummary, setResultsSummary] = useState(""); 

  // categories load
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.categories || []);
      } catch {
        setError("Failed to load categories.");
      }
    })();
  }, []);

  // selectedMealId change -> detail load
  useEffect(() => {
    if (!selectedMealId) return;

    setLoadingMealDetail(true);
    setError("");
    (async () => {
      try {
        const data = await fetchMealDetail(selectedMealId);
        setSelectedMeal(data.meal);
      } catch {
        setError("Failed to load recipe details.");
      } finally {
        setLoadingMealDetail(false);
      }
    })();
  }, [selectedMealId]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setActiveCategory("");
    setSelectedMealId(null);
    setSelectedMeal(null);
    setLoadingMeals(true);
    setError("");
    setResultsSummary(""); // reset

    try {
      const data = await searchMeals(query);
      const list = data.meals || [];
      setMeals(list);
      setResultsSummary(
        list.length
          ? `Showing ${list.length} meals for "${query}"`
          : `No meals found for "${query}"`
      );
    } catch {
      setError("Failed to search meals.");
      setResultsSummary("");
    } finally {
      setLoadingMeals(false);
    }
  };

  const handleCategoryClick = async (category) => {
    setActiveCategory(category);
    setSearchQuery("");
    setSelectedMealId(null);
    setSelectedMeal(null);
    setLoadingMeals(true);
    setError("");
    setResultsSummary(""); // reset

    try {
      const data = await fetchMealsByCategory(category);
      const list = data.meals || [];
      setMeals(list);
      setResultsSummary(
        list.length
          ? `Showing ${list.length} meals in category "${category}"`
          : `No meals found in category "${category}"`
      );
    } catch {
      setError("Failed to load meals for this category.");
      setResultsSummary("");
    } finally {
      setLoadingMeals(false);
    }
  };

  const handleMealClick = (mealId) => {
    setSelectedMealId(mealId);
  };

  const handleRandomClick = async () => {
    setLoadingMealDetail(true);
    setSelectedMealId(null);
    setSelectedMeal(null);
    setError("");
    setResultsSummary(""); 

    try {
      const data = await fetchRandomMeal();
      if (data.meal) {
        setSelectedMeal(data.meal);
        setSelectedMealId(data.meal.idMeal);
      } else {
        setError("No random meal found.");
      }
    } catch {
      setError("Failed to fetch random meal.");
    } finally {
      setLoadingMealDetail(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-title">🍽 TheMealDB Explorer</div>
        <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>
          Search, browse & explore recipes powered by TheMealDB
        </div>
      </header>

      <main className="app-main">
        <div className="top-row">
          <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
          <RandomMealButton onClick={handleRandomClick} />
        </div>

        <CategoryList
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />

        {error && <div style={{ color: "#c62828", marginTop: "0.5rem" }}>{error}</div>}

        {resultsSummary && !error && (
          <div
            style={{
              marginTop: "0.5rem",
              fontSize: "0.9rem",
              color: "#555"
            }}
          >
            {resultsSummary}
          </div>
        )}

        {loadingMeals ? (
          <div style={{ marginTop: "1rem" }}>Loading meals...</div>
        ) : (
          <MealGrid meals={meals} onMealClick={handleMealClick} />
        )}

        {loadingMealDetail && <div style={{ marginTop: "1rem" }}>Loading recipe...</div>}

        {selectedMeal && <MealDetail meal={selectedMeal} />}
      </main>

      <footer className="app-footer">
        Built for TheMealDB Explorer task · Uses public TheMealDB API (test key 1)
      </footer>
    </div>
  );
}

export default App;

