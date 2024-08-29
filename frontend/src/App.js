import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AdminHomePage from './pages/admin/AdminHomePage';
import Header from './components/Header/Header';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <AppContent isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} username={username} setUsername={setUsername} cartItems={cartItems} setCartItems={setCartItems} />
    </Router>
  );
}

function AppContent({ isLoggedIn, setLoggedIn, username, setUsername, cartItems, setCartItems }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCartItems([]);
    navigate("/login");
  };

  const handleAddToCart = (item, quantity) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity = quantity;
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const handleDeleteFromCart = (itemId) => {
    console.log("itemId: ", itemId)
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      {isLoggedIn && <Header username={username} onLogout={handleLogout} numberOfCartItems={cartItems.length} />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home handleAddToCart={handleAddToCart} /> : <Navigate to="/register" />} />
        <Route path="/admin-dashboard" element={isLoggedIn ? <AdminHomePage /> : <Navigate to="/register" />} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} username={username} setUsername={setUsername} />} />
        <Route path="/register" element={<Register isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/profile" element={isLoggedIn ? <ProfilePage user={username} /> : <Navigate to="/register" />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} handleDeleteCartItem={handleDeleteFromCart} />} />
        {/* Redirect to home if any undefined route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
