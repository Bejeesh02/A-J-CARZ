import React, { useState } from "react";
import './login.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        username,
        phoneNumber,
      });

      // Save username and phone number to localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("phoneNumber", phoneNumber);
      // You can also set email here if needed
      // localStorage.setItem("email", userEmail);

      alert(res.data.message || 'Login successful!');
      navigate('/'); // Redirect to homepage or bookings page
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div id="body">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>

          <div className="input-box">
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => {
                let val = e.target.value;
                if (val.startsWith('+91')) {
                  val = val.slice(3);
                }
                setPhoneNumber(val);
              }}
              required
              pattern="[0-9]{10}"
              maxLength="10"
            />
            <FaLock className="icon" />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
