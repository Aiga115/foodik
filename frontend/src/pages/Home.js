import React from "react";
import { useNavigate } from "react-router-dom";
import MenuList from "../components/MenuList";

const Home = ({ setLoggedIn, username }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        navigate("/login");
    };
    return (
        <div style={{ height: '100vh', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <h1>Welcome, {username}!</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <h1>Foodik's Menu</h1>
            <MenuList />
        </div>
    )
}
export default Home;
