import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
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
        <Route exact path="/" element={<Home setLoggedIn={setLoggedIn} username={username} />} />
        <Route exact path="/login" element={<Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} username={username} setUsername={setUsername} />} />
        <Route path="/register" element={<Register isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
