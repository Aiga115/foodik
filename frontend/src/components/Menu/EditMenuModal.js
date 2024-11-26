import React, { useState, useEffect } from 'react';

const EditMenuModal = ({ open, onClose, menuItem, onSave }) => {
    const [name, setName] = useState(menuItem?.name || '');

    useEffect(() => {
        setName(menuItem?.name || '');
    }, [menuItem]);

    const handleSave = () => {
        onSave({ ...menuItem, name });
    };

    if (!open) {
        return null;
    }

    return (
        <div style={{
            position: "fixed",
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
            alignItems: "center",
            bottom: 0,
            right: 0,
            left: 0
        }}>
            <div style={{ background: "#fff", padding: "20px", maxWidth: "400px", margin: "auto" }}>
                <h2>Edit Menu</h2>
                <input
                    type="text"
                    placeholder="Enter menu name"
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

export default EditMenuModal;

