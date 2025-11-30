// frontend/src/components/SearchBar.jsx
import React, { useState } from "react";

function SearchBar({ onSearch, initialQuery = "" }) {
  const [value, setValue] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search meals by name (e.g., 'chicken', 'pasta')"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
