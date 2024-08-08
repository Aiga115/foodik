import React, { useState } from "react";
import { handleDeleteFoodItem, handleSaveFoodItem } from "../../utils";


const FoodItemForm = ({ food, categoryId }) => {
    const [name, setName] = useState(food.name);
    const [price, setPrice] = useState(food.price);
    const [quantity, setQuantity] = useState(food.quantity);
    const [description, setDescription] = useState(food.description);


    return (
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', width: '100%', marginTop: '12px' }}>
            <div style={{
                maxWidth: '600px',
                display: 'grid',
                gap: '10px',
                gridTemplateColumns: 'auto auto auto'
            }}
            >
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <button onClick={() => { handleDeleteFoodItem(food) }}>Delete</button>
                <button onClick={() => { handleSaveFoodItem(food, name, price, description, quantity, categoryId)}}>Save</button>
            </div>
        </div>
    );
};

export default FoodItemForm;
