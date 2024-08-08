import React, { useState, useEffect } from 'react';

const AddFoodItemModal = ({ show, onClose, categoryItem, onSave }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(name || '');
        setPrice(price || '')
        setQuantity(quantity || '')
        setDescription(description || '')
    }, [name, price, description, quantity]);

    const handleSave = () => {
        onSave(name, price, quantity, description, categoryItem);
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal" style={{
            position: "fixed",
            zIndex: 1,
            paddingTop: "100px",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            overflow: "auto",
            backgroundColor: "rgb(0, 0, 0)",
            backgroundColor: "rgba(0, 0, 0, 0.4)"
        }}>
            <div className="modal-content" style={{ background: "#fff", padding: "20px", maxWidth: "400px", margin: "auto" }}>
                <h2>Add Food to Category</h2>
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
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div >
    );
};

export default AddFoodItemModal;

