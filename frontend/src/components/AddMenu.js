import React from "react";
import { useState } from "react";

const AddMenu = () => {
    const [name, setName] = useState('');

    const handleSave = () => {
        if (!name) {
            alert('Please fill in all fields');
            return;
        }

        fetch('http://127.0.0.1:5000/menus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
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
                    alert('Successfully added the menu!');
                    // navigate('/login');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while processing your request');
            });
    }

    return (<> <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
    />
        <button onClick={handleSave}>Save</button>
    </>)
}

export default AddMenu;