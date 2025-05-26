import React, { useState } from "react";
import './register.css';
import { FaUser, FaPhone, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios to handle HTTP requests
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(""); // For handling error messages
  const navigate = useNavigate();

  // Handling form field changes
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleCheckboxChange = (e) => setRememberMe(e.target.checked);

  // Submit form and send data to backend
  const handleSubmit = (e) => {
    e.preventDefault();

    // Phone number validation: Should be exactly 10 digits and contain only numbers
    const phoneRegex = /^\d{10}$/;  // Exactly 10 digits
    if (!phoneRegex.test(phone)) {
      setError("Phone number must be 10 digits and contain only numbers.");
      return;
    }

    // Creating a user object to send to the backend
    const user = {
      username,
      phone,
      email,
      password
    };

    // Send POST request to backend
    axios.post('http://localhost:5000/api/register', user)
      .then(response => {
        alert(response.data.message);
        navigate('/login');  // Redirect to login after successful registration
      })
      .catch(error => {
        console.log(error);
        alert("Registration failed. Please try again.");
      });
  };

  return (
    <div id="body">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>REGISTER</h1>

          {error && <p className="error-message">{error}</p>} {/* Display error message */}

          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
            <FaUser className="icon" />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
            <FaPhone className="icon" />
          </div>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <FaEnvelope className="icon" />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <FaLock className="icon" />
          </div>

          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleCheckboxChange}
              /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Register</button>

          <div className="register-link">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
