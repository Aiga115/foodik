import React, { useState, useEffect } from 'react';

const EditMenuModal = ({ show, onClose, menuItem, onSave }) => {
    const [name, setName] = useState(menuItem?.name || '');

    useEffect(() => {
        setName(menuItem?.name || '');
    }, [menuItem]);

    const handleSave = () => {
        onSave({ ...menuItem, name });
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Menu</h2>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default EditMenuModal;

