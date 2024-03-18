import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Login = ({ isLoggedIn, setLoggedIn, username, setUsername }) => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          // No token is returned, so just set loggedIn to true
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while processing your request');
      });
  };


  return (
    <div className="App">
      {!isLoggedIn && (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <Link to='/register'>Not registered yet? Sign up here</Link>
        </div>
      )}
    </div>
  );
}

export default Login;
