// Ride.js
import React from 'react';
import './Ride.css'; // Import the CSS file

const Ride = () => {
  return (
    <div className="ride-section">
      <div className="ride-overlay">
        <div className="ride-content">
          <h1>Our Services</h1>
          <p>
            At <strong>A J CARZ</strong>, we offer a wide range of car rental and travel solutions designed to meet your every need. Whether it’s a short ride around town or a long journey out of the city, we provide reliable, affordable, and comfortable travel options you can count on.
          </p>

          <ul>
            <li>🚗 <strong>Local & Outstation Car Rentals:</strong> Need a car for a quick city errand or a weekend getaway? Our clean, well-maintained vehicles are available for both local and outstation trips. Choose from a wide range of cars to match your style and budget.</li>
            <li>🏢 <strong>Corporate & Business Travel:</strong> Ensure your team travels in comfort and arrives on time. We offer dedicated travel solutions for corporate clients, including airport transfers, meetings, and business tours with punctual service and professional drivers.</li>
            <li>✈️ <strong>Airport Pick-Up & Drop-Off:</strong> Never miss a flight again. Our on-time airport transfer services ensure a smooth start or end to your journey. We serve all major airports in and around Chennai with 24/7 availability.</li>
            <li>🧳 <strong>Tour Packages & Custom Trips:</strong> Planning a family vacation or pilgrimage? Let us take care of the travel. We offer customizable tour packages that include vehicle rental, route planning, and stopovers—designed around your schedule and preferences.</li>
            <li>👨‍👩‍👧‍👦 <strong>Family & Group Travel:</strong> Travel together in comfort! Our spacious vehicles are perfect for families and groups, ensuring everyone enjoys the ride—safely and comfortably.</li>
            <li>🔧 <strong>Well-Maintained Fleet:</strong> All our vehicles undergo regular maintenance and cleanliness checks. Your safety, comfort, and satisfaction are our top priorities.</li>
            <li>🕒 <strong>24/7 Customer Support:</strong> Our dedicated team is always ready to assist you—any time, any day. From bookings to trip planning, we’re just a call away.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Ride;
