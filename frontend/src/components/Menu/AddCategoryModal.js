import React, { useState, useEffect } from 'react';

const AddCategoryModal = ({ open, onClose, onSave }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        setName(name || '');
    }, [name]);

    const handleSave = () => {
        onSave(name);
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
                <h2>Add Category to Menu</h2>
                <input
                    type="text"
                    placeholder="Enter category name"
                    className="box"
                    maxLength="50"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="flex" style={{ display: "flex", justifyContent: "space-between" }}>
                    <button className="btn" onClick={handleSave}>Save</button>
                    <button className="delete-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div >
    );
};

export default AddCategoryModal;

