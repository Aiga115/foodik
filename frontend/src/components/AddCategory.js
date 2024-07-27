import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
    const [name, setName] = useState('');
    const [menuId, setMenuId] = useState('');
    const [menu, setMenu] = useState([]);

    const handleMenus = () => {
        if (!name || !menuId) {
            alert('Please fill in all fields');
            return;
        }

        fetch('http://127.0.0.1:5000/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, menu_id: menuId }),
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
                    // navigate('/login');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while processing your request');
            });
    };

    useEffect(() => {
        fetch('http://127.0.0.1:5000/menus')
            .then(response => response.json())
            .then(data => setMenu(data));
    }, [])

    return (<>
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="menu-select">Choose menu:</label>
        <select name="menu-select" id="menu-select" onChange={(e) => setMenuId(e.target.value)}>
            {menu?.map((menuItem) => {
                return (
                    <option key={menuItem.id} value={menuItem.id}>
                        {menuItem.name}
                    </option>
                )
            })}
        </select>
        <button onClick={handleMenus}>Save</button>
    </>)
}

export default AddCategory;
