import React, { useState, useEffect } from 'react';

const AddFoodItemModal = ({ open, onClose, categoryItem, onSave }) => {
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

    if (!open) {
        return null;
    }

    return (
        <div style={{
            position: "absolute",
            zIndex: 10000,
            padding: 0,
            top: 0,
            width: "100%",
            height: "100%",
            overflow: "auto",
            width: "100%",
            textAlign: "center",
            border: "1px solid black",
            animation: "fadeIn .2s linear",
            backgroundColor: "rgb(0, 0, 0)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center"
        }}>
            <div style={{ background: "#fff", padding: "20px", maxWidth: "400px", margin: "auto" }}>
                <h2>Add Food to Category</h2>
                <input
                    type="text"
                    placeholder="Enter name"
                    className="box"
                    maxLength="50"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Enter price"
                    className="box"
                    maxLength="50"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Enter quantity"
                    className="box"
                    maxLength="50"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter description"
                    className="box"
                    maxLength="50"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex" style={{ display: "flex", justifyContent: "space-between" }}>
                    <button className="btn" onClick={handleSave}>Save</button>
                    <button className="delete-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div >
    );
};

export default AddFoodItemModal;

