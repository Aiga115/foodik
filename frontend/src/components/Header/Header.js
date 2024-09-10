import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const Header = ({ username, onLogout, numberOfCartItems }) => {
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
                        <Link to="/messages">messages</Link>
                        <Link to="/orders">orders</Link>
                    </nav>
                ) : (
                    <nav className="navbar">
                        <Link to="/">home</Link>
                        <Link to="/about">about</Link>
                        <Link to="/orders">orders</Link>
                        <Link to="/contact">contact</Link>
                    </nav>
                )}

                <div className="icons">
                    {isAdmin ? <></> : <Link to="/cart"><i className="fas fa-shopping-cart"></i><span style={{ margin: 0 }}>{numberOfCartItems}</span></Link>}
                    <div id="user-btn" className="fas fa-user" onClick={handleOpenProfileModal}></div>
                </div>

                <ProfileModal open={openProfileModal} onClose={handleCloseProfileModal} username={username} onLogout={onLogout} />
            </section>

        </header>
    )
}
export default Header;