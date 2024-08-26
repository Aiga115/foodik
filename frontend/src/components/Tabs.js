import React from 'react';

const Tabs = ({ categories, activeCategory, onCategorySelect }) => {
  return (
    <div className="tabs">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`tab ${category.name === activeCategory ? 'active' : ''}`}
          onClick={() => onCategorySelect(category.name)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
