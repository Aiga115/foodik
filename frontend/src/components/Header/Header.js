import React from "react";


const Header = ({ username, onLogout }) => {

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem' }}>
            <h1>Welcome, {username}!</h1>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}
export default Header;