import React from 'react';
import './Card.css';
import DishIcon from '../assets/dish.png';
const Card = ({ name, price, onAddToBasket }) => {
  return (
    <div className="card">
      <img src={DishIcon} alt={name} />
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
      <button onClick={onAddToBasket}>Add to Basket</button>
    </div>
  );
};

export default Card;
