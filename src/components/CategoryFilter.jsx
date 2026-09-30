import React from 'react';

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-filter-container">
      <span className="category-label">Kategori Populer:</span>
      <div className="category-chips">
        <button
          type="button"
          className={`category-chip ${selectedCategory === '' ? 'active' : ''}`}
          onClick={() => onSelectCategory('')}
        >
          #semua
        </button>
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(selectedCategory === category ? '' : category)}
          >
            #{category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
