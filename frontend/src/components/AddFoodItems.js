import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddFoodItems = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);

    const handleMenus = () => {
        if (!name || !categoryId || !price || !quantity || !description) {
            alert('Please fill in all fields');
            return;
        }

        fetch('http://127.0.0.1:5000/food_items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, quantity, description, category_id: categoryId }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert('Successfully added the category to the menu!');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while processing your request');
            });
    };

    useEffect(() => {
        fetch('http://127.0.0.1:5000/categories')
            .then(response => response.json())
            .then(data => setCategories(data));
    }, [])

    return (<>
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
        <select name="category-select" id="category-select" onChange={(e) => setCategoryId(e.target.value)}>
            {categories?.map((category) => {
                return (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                )
            })}
        </select>
        <button onClick={handleMenus}>Save</button>
    </>)
}

export default AddFoodItems;
