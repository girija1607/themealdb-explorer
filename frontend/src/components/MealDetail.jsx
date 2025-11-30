// frontend/src/components/MealDetail.jsx
import React, { useMemo } from "react";

function buildIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      list.push(`${ing} ${meas ? `- ${meas}` : ""}`.trim());
    }
  }
  return list;
}

function extractYouTubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      return u.searchParams.get("v");
    }
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1);
    }
  } catch {
    return null;
  }
  return null;
}

function MealDetail({ meal }) {
  const ingredients = useMemo(() => buildIngredients(meal), [meal]);
  const youTubeId = useMemo(() => extractYouTubeId(meal.strYoutube), [meal]);

  return (
    <section className="meal-detail">
      <div className="meal-detail-header">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div className="meal-detail-meta">
          <h2>{meal.strMeal}</h2>
          <div className="meta-row">
            {meal.strCategory && <strong>Category:</strong>} {meal.strCategory}
          </div>
          <div className="meta-row">
            {meal.strArea && <strong>Cuisine:</strong>} {meal.strArea}
          </div>
          {meal.strTags && (
            <div className="meta-row">
              <strong>Tags:</strong> {meal.strTags}
            </div>
          )}
        </div>
      </div>

      <div className="section-title">Ingredients</div>
      <ul className="ingredients-list">
        {ingredients.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <div className="section-title">Instructions</div>
      <div className="instructions">{meal.strInstructions}</div>

      {youTubeId && (
        <>
          <div className="section-title">YouTube Tutorial</div>
          <div className="youtube-embed">
            <iframe
              src={`https://www.youtube.com/embed/${youTubeId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </>
      )}
    </section>
  );
}

export default MealDetail;
