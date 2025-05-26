import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './bookinfo.css';
import { BsWhatsapp } from "react-icons/bs";

function BookInfo() {
  const navigate = useNavigate();
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(sessionStorage.getItem('bookings')) || [];

    const loggedInPhone = localStorage.getItem('phoneNumber');
    const loggedInEmail = localStorage.getItem('email');

    const filteredBookings = storedBookings.filter(
      (booking) =>
        (booking.phoneno && booking.phoneno.includes(loggedInPhone)) ||
        (booking.email && booking.email.toLowerCase() === loggedInEmail?.toLowerCase())
    );

    setUserBookings(filteredBookings);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    sessionStorage.clear();
    navigate('/login');
  };

  if (userBookings.length === 0) {
    return (
      <div className="no-data-container" style={{ textAlign: 'center', padding: '40px' }}>
        <h2>No bookings found for your account.</h2>
        <button onClick={() => navigate('/')} style={buttonStyle}>Go to Services</button>
      </div>
    );
  }

  return (
    <div
      id="book-info-container"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '40px',
        color: 'white',
      }}
    >
      <div
        className="info-box"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '12px',
          maxWidth: '800px',
          margin: 'auto',
          padding: '20px',
          position: 'relative',
        }}
      >
        {/* Top-right buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            marginBottom: '10px',
          }}
        >
          <button
            onClick={() => navigate('/')}
            style={buttonStyle}
          >
            Back to Services
          </button>

          <a
            href="https://wa.me/918904036394"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              backgroundColor: '#25D366',
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <BsWhatsapp /> WhatsApp
          </a>

          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#dc3545',
              color: 'white',
              cursor: 'pointer',
            }}
            title="Logout"
          >
            Logout
          </button>
        </div>

        <h2>All Your Bookings</h2>
        {userBookings.map((data, index) => (
          <div
            key={index}
            style={{ borderBottom: '1px solid #555', paddingBottom: '10px', marginBottom: '10px' }}
          >
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              <li><strong>Car:</strong> {data.car}</li>
              <li><strong>Name:</strong> {data.name}</li>
              <li><strong>Email:</strong> {data.email}</li>
              <li><strong>Phone Number:</strong> {data.phoneno}</li>
              <li><strong>Address:</strong> {data.address}</li>
              <li><strong>Travel Location:</strong> {data.travel}</li>
              <li><strong>Days:</strong> {data.days}</li>
              <li><strong>Booking Dates:</strong> {data.proof}</li>
              <li><strong>Booking Type:</strong> {data.bookingType}</li>
              <li><strong>Booked At:</strong> {new Date(data.timestamp).toLocaleString()}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '8px 16px',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
};

export default BookInfo;
