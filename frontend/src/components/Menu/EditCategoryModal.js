import React, { useState, useEffect } from 'react';

const EditCategoryModal = ({ show, onClose, categoryItem, onSave }) => {
    const [name, setName] = useState(categoryItem?.name || '');

    useEffect(() => {
        setName(categoryItem?.name || '');
    }, [categoryItem]);

    const handleSave = () => {
        onSave({ ...categoryItem, name });
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
                <h2>Edit Category</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div >
    );
};

export default EditCategoryModal;

