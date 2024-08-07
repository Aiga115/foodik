import React, { useState } from "react";

const FoodItemForm = ({ food, categoryId, onUpdate }) => {
    const [name, setName] = useState(food.name);
    const [price, setPrice] = useState(food.price);
    const [quantity, setQuantity] = useState(food.quantity);
    const [description, setDescription] = useState(food.description);

    const handleDeleteFoodItem = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/food_items/${food.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Successfully deleted!");
                onUpdate();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditFoodItem = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/food_items/${food.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    price,
                    quantity,
                    description,
                    category_id: categoryId,
                }),
            });

            if (response.ok) {
                alert("Successfully updated!");
                onUpdate();
            } else {
                const result = await response.json();
                alert(`Failed to update: ${result.error}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                <button onClick={handleDeleteFoodItem}>Delete</button>
                <button onClick={handleEditFoodItem}>Save</button>
            </div>
        </div>
    );
};

export default FoodItemForm;
