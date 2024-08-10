import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // Typically, you won't fetch/display this
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/user/admin");
        const userData = response.data;
        setUsername(userData.username);
        setEmail(userData.email);
        setPhoneNumber(userData.phoneNumber);
        // Do not set password for security reasons
 
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !phoneNumber) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/user/${username}`,
        {
          username,
          password, // Include only if needed
          email,
          phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Successfully updated!");
      } else {
        alert(`Failed to update: ${response.data.error}`);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.error ||
          "An error occurred while processing your request"
      );
    }
  };

  return (
    <section className="form-container" style={{ margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <h3>Update your profile</h3>
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
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </section>
  );
};

export default ProfilePage;
