import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ isLoggedIn, setLoggedIn, username, setUsername }) => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

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
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.user.role);
          setLoggedIn(true);
          if (data.user.role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/');
          }
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(`An error occurred: ${error.message}`);
      });
  };

  return (
    <section className="form-container" style={{ margin: "auto" }}>
      {!isLoggedIn && (
        <form onSubmit={handleLogin}>
          <h3>Login now</h3>
          <input
            type="text"
            placeholder="Enter your username"
            required
            className="box"
            maxLength="50"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="pass"
            required
            placeholder="Enter your password"
            className="box"
            maxLength="50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn">Login</button>
          <p>Not registered yet? <Link to='/register'>Sign up here</Link></p>
        </form>
      )}
    </section>
  );
};

export default Login;
