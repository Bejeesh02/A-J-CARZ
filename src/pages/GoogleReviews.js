// GoogleReviews.jsx
import React from 'react';

const GoogleReviews = () => {
  return (
    <div style={{ margin: '2rem 0', textAlign: 'center' }}>
      <h2>⭐ What Our Customers Say</h2>
      <iframe
        title="A J CARZ Google Reviews"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.713641870677!2d80.0935394758868!3d12.92611741587221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f5006bd0c94d%3A0xa27b9c32a8f4fb87!2sA%20J%20CARZ!5e0!3m2!1sen!2sin!4v1748114611291!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0, maxWidth: '100%' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleReviews;
