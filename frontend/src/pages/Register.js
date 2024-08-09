import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = ({ isLoggedIn, setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const role = "user";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !email || !phoneNumber) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
        email,
        phoneNumber,
        role,
      });

      setLoading(false);
      setError("");
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data.error ||
          "An error occurred while processing your request"
      );
    }
  };

  return (
    <section className="form-container" style={{ margin: "auto" }}>
      {!isLoggedIn && (
        <form onSubmit={handleSubmit}>
          <h3>Register now</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="box"
            maxLength="50"
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="box"
            maxLength="50"
          />
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="box"
            maxLength="50"
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <p>Already have an account? <Link to='/login'>Sign In here</Link></p>
        </form>
      )}
    </section>
  );
};

export default Register;
