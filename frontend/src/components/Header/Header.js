import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const Header = ({ username, onLogout }) => {
    const [openProfileModal, setOpenProfileModal] = useState(false);

    const handleCloseProfileModal = () => {
        setOpenProfileModal(false);
    };

    const handleOpenProfileModal = () => {
        setOpenProfileModal(true);
    }

    const isAdmin = username === "admin"

    return (
        <header className="header">

            <section className="flex">

                <Link to={isAdmin ? "/admin-dashboard" : "/"} className="logo">foodik 😋</Link>

                {isAdmin ? (
                    <nav className="navbar">
                        <Link to="/admin-dashboard">admin dashboard</Link>
                    </nav>
                ) : (
                    <nav className="navbar">
                        <Link to="#">home</Link>
                        <Link to="#">about</Link>
                        <Link to="#">menu</Link>
                        <Link to="#">orders</Link>
                        <Link to="#">contact</Link>
                    </nav>
                )}

                <div className="icons">
                    {isAdmin ? <></> : <Link to="#"><i className="fas fa-shopping-cart"></i><span>4</span></Link>}
                    <div id="user-btn" className="fas fa-user" onClick={handleOpenProfileModal}></div>
                </div>

                <ProfileModal open={openProfileModal} onClose={handleCloseProfileModal} username={username} onLogout={onLogout} />
            </section>

        </header>
    )
}
export default Header;