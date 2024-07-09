import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ setLoggedIn, username }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        navigate("/login");
    };
    return (
        <>
            <h1>Welcome, {username}!</h1>
            <button onClick={handleLogout}>Logout</button>
            <Menus/>
        </>
    )
}
export default Home;


const Menus = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');

    const handleMenus = () => {
        if (!name || !price || !quantity || !description) {
            alert('Please fill in all fields');
            return;
        }
    
        fetch('http://127.0.0.1:5000/food_items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, price, quantity, description, category_id: '1'}),
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
                    alert('Successfully added!');
                   // navigate('/login');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while processing your request');
            });
    };

    return (<> <input
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
 <button onClick={handleMenus}>Save</button>


        </>)


}
