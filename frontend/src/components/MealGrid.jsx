// frontend/src/components/MealGrid.jsx
import React from "react";
import MealCard from "./MealCard.jsx";

function MealGrid({ meals, onMealClick }) {
  if (!meals || meals.length === 0) {
    return (
      <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#777" }}>
        No meals to show. Try searching or choose a category.
      </div>
    );
  }

  return (
    <div className="meal-grid">
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} onClick={() => onMealClick(meal.idMeal)} />
      ))}
    </div>
  );
}

export default MealGrid;
