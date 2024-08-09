import React from "react";
import { useState } from "react";
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

                <a href="#" className="logo">foodik 😋</a>

                {isAdmin ? (
                    <nav className="navbar">
                        <a href="/admin-dashboard">admin dashboard</a>
                    </nav>
                ) : (
                    <nav className="navbar">
                        <a href="#">home</a>
                        <a href="#">about</a>
                        <a href="#">menu</a>
                        <a href="#">orders</a>
                        <a href="#">contact</a>
                    </nav>
                )}

                <div className="icons">
                    {isAdmin ? <></> : <a href="cart.php"><i className="fas fa-shopping-cart"></i><span>4</span></a>}
                    <div id="user-btn" className="fas fa-user" onClick={handleOpenProfileModal}></div>
                </div>

                <ProfileModal open={openProfileModal} onClose={handleCloseProfileModal} username={username} onLogout={onLogout} />
            </section>

        </header>
    )
}
export default Header;