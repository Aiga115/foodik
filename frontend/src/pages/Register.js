import React, { useState } from 'react';

const Register = ({ isLoggedIn, setLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleRegister = () => {
        if (!username || !password || !email || !phoneNumber) {
            alert('Please fill in all fields');
            return;
        }

        fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email, phoneNumber }),
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
                    // Registration successful, but no token is returned
                    alert('Registration successful!');
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
                    <h2>Register</h2>
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
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <button onClick={handleRegister}>Register</button>
                </div>
            )}
        </div>
    );
}

export default Register;

