import React from "react";
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
        </>
    )
}
export default Home;