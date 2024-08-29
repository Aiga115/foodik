import React, { useState } from "react";
import DishIcon from "../assets/dishes.png";

const FoodCard = ({ item, handleAddToCart, isCart, handleDeleteItem }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (value >= 1 && value <= item.quantity) {
            setQuantity(value);
        }
    };

    return (
        <div className="box" style={{ minWidth: "250px" }}>
            {isCart ? <button className="fa fa-trash" onClick={() => handleDeleteItem(item.id)}></button> : (
                <button className="fas fa-shopping-cart" onClick={() => handleAddToCart(item, quantity)}></button>
            )}
            <img src={DishIcon} alt="" />
            <div className="cat">{item.description}</div>
            <div className="name">{item.name}</div>
            <div className="flex">
                <div className="price"><span>$</span>{item.price}</div>
                <input
                    type="number"
                    name="qty"
                    className="qty"
                    min="1"
                    max={item.quantity}
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </div>
        </div>
    );
};

export default FoodCard;
