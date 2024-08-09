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

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <Router>
      <AppContent isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} username={username} setUsername={setUsername} />
    </Router>
  );
}

function AppContent({ isLoggedIn, setLoggedIn, username, setUsername }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate("/login");
  };


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      {isLoggedIn && <Header username={username} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/register" />} />
        <Route path="/admin-dashboard" element={isLoggedIn ? <AdminHomePage /> : <Navigate to="/register" />} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} username={username} setUsername={setUsername} />} />
        <Route path="/register" element={<Register isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/register" />} />
        {/* Redirect to home if any undefined route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
