// frontend/src/components/MealCard.jsx
import React from "react";

function MealCard({ meal, onClick }) {
  return (
    <div className="meal-card" onClick={onClick}>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <div className="meal-card-body">
        <div className="meal-card-title">{meal.strMeal}</div>
        <div className="meal-card-subtitle">
          {meal.strArea ? (
            <span className="badge">{meal.strArea}</span>
          ) : (
            <span style={{ fontSize: "0.8rem", color: "#999" }}>Tap for details</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MealCard;
