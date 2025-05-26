import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './navbar';
import Hotel from './pages/hotel';
import Login from './pages/login';
import axios from 'axios';
import Services from './pages/services';
import Footer from './footer';
import Register from './pages/register';
import ReactGA from 'react-ga';
import About from './pages/about';
import Feedback from './pages/feedback';
import Reviews from './pages/review';
import Ride from './pages/ride';
import BookInfo from './pages/bookinfo';

// Initialize Google Analytics with your tracking ID
ReactGA.initialize('UA-XXXXXXX-X'); // Replace with your actual Google Analytics ID

// Simple ProtectedRoute component to protect routes
function ProtectedRoute({ children }) {
  const phoneNumber = localStorage.getItem('phoneNumber');
  const username = localStorage.getItem('username');

  if (!phoneNumber || !username) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  // State to store user data and form inputs
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null); // Added state for handling errors

  // API base URL
  const API_URL = 'http://localhost:5000/api'; // You can change this for production

  // Fetch users from backend when component mounts
  useEffect(() => {
    axios
      .get(`${API_URL}/users`)
      .then((response) => {
        setUsers(response.data);
        ReactGA.pageview(window.location.pathname); // Log pageview in Google Analytics
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again later.');
      });
  }, []);

  // Handle form submission to add a new user
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form input
    if (!name || !email) {
      setError('Please provide both name and email.');
      return;
    }

    // Send a POST request to backend to add a new user
    axios
      .post(`${API_URL}/users`, { name, email })
      .then((response) => {
        // Add the new user to the users list
        setUsers([...users, response.data]);

        // Clear the form fields and error state
        setName('');
        setEmail('');
        setError(null);
      })
      .catch((error) => {
        console.error('Error adding user:', error);
        setError('Failed to add user. Please try again later.');
      });
  };

  return (
    <div>
      <Router>
        <Navbar />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotel" element={<Hotel />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/review" element={<Reviews />} />
            <Route path="/ride" element={<Ride />} />

            {/* Protect the bookinfo route */}
            <Route
              path="/bookinfo"
              element={
                <ProtectedRoute>
                  <BookInfo />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
