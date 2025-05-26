import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './services.css';

function Services() {
  const location = useLocation();
  const carName = location.state?.carName || '';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    address: '',
    travel: '',
    startingDate: '',
    endingDate: '',
    phone: '',
  });

  const [bookingType, setBookingType] = useState('myself');
  const [loginPhone, setLoginPhone] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username');
    const loginPhoneNumber = localStorage.getItem('phoneNumber');
    if (!username || !loginPhoneNumber) {
      alert('❌ You must log in to access the booking form.');
      navigate('/login');
    } else {
      setLoginPhone(loginPhoneNumber);
    }
  }, [navigate]);

  useEffect(() => {
    if (bookingType === 'myself') {
      setFormData((prev) => ({ ...prev, phone: loginPhone }));
    } else {
      setFormData((prev) => ({ ...prev, phone: '' }));
    }
  }, [bookingType, loginPhone]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.startingDate) > new Date(formData.endingDate)) {
      alert("❌ Starting date can't be after ending date.");
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("❌ Please enter a valid 10-digit phone number.");
      return;
    }

    const payload = {
      car: carName,
      name: formData.customerName,
      email: formData.email,
      phoneno: '+91' + formData.phone,
      address: formData.address,
      travel: formData.travel,
      days: calculateDays(formData.startingDate, formData.endingDate),
      proof: `${formatDate(formData.startingDate)} to ${formatDate(formData.endingDate)}`,
      bookingType: bookingType,
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post('http://localhost:5000/api/users', payload);

      const previousBookings = JSON.parse(sessionStorage.getItem('bookings')) || [];
      const updatedBookings = [payload, ...previousBookings];
      sessionStorage.setItem('bookings', JSON.stringify(updatedBookings));

      alert('✅ Booking submitted successfully!');
      setFormData({
        customerName: '',
        email: '',
        address: '',
        travel: '',
        startingDate: '',
        endingDate: '',
        phone: '',
      });

      navigate('/bookinfo');
    } catch (error) {
      console.error('❌ Submission failed:', error);
      alert('❌ Failed to submit booking.');
    }
  };

  return (
    <div id="body">
      <div id="bo">
        <h2>Service Form</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px', fontWeight: 'bold' }}>
            Selected Car: <span>{carName}</span>
          </div>

          <label id="bo1">Booking For:
            <select value={bookingType} onChange={(e) => setBookingType(e.target.value)}>
              <option value="myself">Myself</option>
              <option value="others">Others</option>
            </select>
          </label>

          <label id="bo1">Name:<br />
            <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required />
          </label>

          <label id="bo1">Email:<br />
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>

          <label id="bo1">Address:<br />
            <textarea name="address" value={formData.address} onChange={handleChange} required rows={3} />
          </label>

          <label id="bo1">Travel Location:<br />
            <textarea name="travel" value={formData.travel} onChange={handleChange} required rows={2} />
          </label>

          <label id="bo1">Starting Date:<br />
            <input type="date" name="startingDate" value={formData.startingDate} onChange={handleChange} required />
          </label>

          <label id="bo1">Ending Date:<br />
            <input type="date" name="endingDate" value={formData.endingDate} onChange={handleChange} required />
          </label>

          <label id="bo1">
            Phone Number:<br />
            <div style={{ display: 'flex' }}>
              <span style={{ padding: '8px', border: '1px solid #ccc', borderRight: 'none', borderRadius: '4px 0 0 4px' }}>+91</span>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                required
                disabled={bookingType === 'myself'}
                style={{
                  flex: 1,
                  border: '1px solid #ccc',
                  borderLeft: 'none',
                  borderRadius: '0 4px 4px 0',
                  backgroundColor: bookingType === 'myself'  }}
              />
            </div>
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Services;
