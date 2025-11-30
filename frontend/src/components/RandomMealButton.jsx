// frontend/src/components/RandomMealButton.jsx
import React from "react";

function RandomMealButton({ onClick }) {
  return (
    <button type="button" className="button-secondary" onClick={onClick}>
      🍔 I&apos;m feeling hungry
    </button>
  );
}

export default RandomMealButton;
