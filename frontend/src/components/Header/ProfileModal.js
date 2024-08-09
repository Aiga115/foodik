import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileModal = ({ open, onClose, username, onLogout }) => {
    const navigate = useNavigate();

    if(!open){
        return null;
    }

    const handleNavigateToProfile = () => {
        navigate("/profile")
        onClose()
    }

    const handleLogoutBtnClick = () => {
        onClose();
        onLogout();
    }

    return (
        <div style={{
            backgroundColor: "#fff",
            border: "1px solid black",
            padding: "1.5rem",
            textAlign: "center",
            position: "absolute",
            top: "125%",
            right: "2rem",
            width: "30rem",
            animation: "fadeIn .2s linear"
        }}>
            <h2 className="name">Hi! {username}</h2>
            <div className="flex">
                <button className="btn" onClick={handleNavigateToProfile}>Profile</button>
                <button className="delete-btn" onClick={handleLogoutBtnClick}>Logout</button>
            </div>
        </div >
    )
}

export default ProfileModal