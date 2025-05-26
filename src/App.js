import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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

// Initialize Google Analytics with your tracking ID from env variable
ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);

function ProtectedRoute({ children }) {
  const phoneNumber = localStorage.getItem('phoneNumber');
  const username = localStorage.getItem('username');

  if (!phoneNumber || !username) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  // State
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  // Use API URL from environment variable
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/users`)
      .then((response) => {
        setUsers(response.data);
        ReactGA.pageview(window.location.pathname); // Track pageview
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again later.');
      });
  }, [API_URL]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Please provide both name and email.');
      return;
    }
    axios
      .post(`${API_URL}/users`, { name, email })
      .then((response) => {
        setUsers([...users, response.data]);
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
