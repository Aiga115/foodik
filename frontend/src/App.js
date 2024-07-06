import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home setLoggedIn={setLoggedIn} username={username} /> : <Navigate to="/register" />} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} username={username} setUsername={setUsername} />} />
        <Route path="/register" element={<Register isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
        {/* Optional: Redirect to home if any undefined route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
