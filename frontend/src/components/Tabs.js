import React from 'react';
const Tabs = ({ activeItem }) => {
    const categories = {
      Salad: ['Seosanal', 'Fruit'],
      Burger: ['Chicken', 'Beef'],
      Shawarma: ['Chicken Shawarma', 'Beef Shawarma'],
      Pizza: ['Classic', 'Non Classic'],
      Sauce: ['Spicy', 'Sweet'],
      Beverages: ['Soda', 'Water'],
    };
  
    return (
      <div className="tabs">
        {categories[activeItem].map((category, index) => (
          <button key={index} className="tab">
            {category}
          </button>
        ))}
      </div>
    );
  };
  
  export default Tabs;