import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const maxWords = 300;

  const handleFeedbackChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) {
      setFeedback(text);
      setWordCount(words.filter(word => word !== '').length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          feedbackText: feedback
        })
      });

      const data = await response.json();
      alert(data.message);

      if (response.ok) {
        setFeedback('');
        setWordCount(0);
      }
    } catch (err) {
      console.error('❌ Error submitting feedback:', err);
      alert('❌ Failed to submit feedback');
    }
  };

  return (
    <div className="feedback-wrapper">
      <div className="feedback-container">
        <h2 className="feedback-title">Feedback / Grievance</h2>
        <form className="feedback-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="optional" />

          <label htmlFor="phone">Phone Number</label>
          <div className="phone-group">
            <input type="tel" id="phone" maxLength="10" pattern="[0-9]{10}" placeholder="*optional" />
          </div>

          <label htmlFor="feedback">Help us to improve</label>
          <textarea
            id="feedback"
            placeholder="Write your feedback here (max 300 words)"
            value={feedback}
            onChange={handleFeedbackChange}
            rows="6"
          />
          <div className="word-count">{wordCount}/{maxWords} words</div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
