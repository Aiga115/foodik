import React, { useState } from "react";
import { handleSaveFoodItem } from "../../utils";


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: '12px'
    },
    form: {
        maxWidth: '600px',
        display: 'grid',
        gap: '10px',
        gridTemplateColumns: 'auto auto auto',
        alignItems: 'center'
    },
    fieldContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        fontSize: '14px'
    },
    buttonGroup: {
        display: 'flex',
        gap: '10px',
        marginTop: '10px'
    }
};


const FormField = ({ id, label, type, value, onChange, placeholder, maxLength }) => (
    <div style={styles.fieldContainer}>
        <label htmlFor={id}>{label}:</label>
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="box"
            maxLength={maxLength}
        />
    </div>
);

const FoodItemForm = ({ food, categoryId, handleDeleteFoodItem }) => {
    const [name, setName] = useState(food.name);
    const [price, setPrice] = useState(food.price);
    const [quantity, setQuantity] = useState(food.quantity);
    const [description, setDescription] = useState(food.description);

    return (
        <div style={styles.container}>
            <div style={styles.form}>
                <FormField
                    id="name"
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    maxLength="50"
                />
                <FormField
                    id="price"
                    label="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    maxLength="50"
                />
                <FormField
                    id="quantity"
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Quantity"
                    maxLength="50"
                />
                <FormField
                    id="description"
                    label="Description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    maxLength="50"
                />
            </div>

            <div style={styles.buttonGroup}>
                <button onClick={() => handleDeleteFoodItem(food.id)} className="delete-btn">Delete</button>
                <button
                    onClick={() => handleSaveFoodItem(food, name, price, quantity, description, categoryId)}
                    className="btn"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default FoodItemForm;
