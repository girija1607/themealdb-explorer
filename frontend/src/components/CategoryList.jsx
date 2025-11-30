// frontend/src/components/CategoryList.jsx
import React from "react";

function CategoryList({ categories, activeCategory, onCategoryClick }) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="categories-container">
      <div style={{ marginBottom: "0.4rem", fontSize: "0.9rem", fontWeight: 600 }}>
        Browse by category
      </div>
      <div className="categories-scroll">
        {categories.map((cat) => (
          <button
            key={cat.idCategory}
            type="button"
            className={
              "category-pill" + (activeCategory === cat.strCategory ? " active" : "")
            }
            onClick={() => onCategoryClick(cat.strCategory)}
          >
            {cat.strCategory}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategoryList;
