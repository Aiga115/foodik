import React from "react";

const ProfileModal = ({ open, onClose, username, onLogout }) => {

    if(!open){
        return null;
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
                <a href="#" className="btn">profile</a>
                <a href="#" className="delete-btn" onClick={handleLogoutBtnClick}>logout</a>
            </div>
        </div >
    )
}

export default ProfileModal