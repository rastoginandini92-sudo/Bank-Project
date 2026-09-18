import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';

export default function EnterDetailsScreen({ onBack, onNext, selectedService }) {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [mothersName, setMothersName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNext) {
      onNext({
        fullName,
        dob,
        mothersName,
        mobileNumber,
        selectedService
      });
    }
  };

  return (
    <div className="home-screen-padding">
      <div className="home-white-card">
        {/* Header with HDFC Bank Logo Badge */}
        <div className="details-header">
          <div className="details-header-left">
            <button className="details-back-circle" onClick={onBack} title="Back">
              <ArrowLeft size={22} strokeWidth={2.5} />
            </button>
            <h2>Enter Details</h2>
          </div>
          <div className="header-logo-badge">
            <img src={logo} alt="HDFC Bank Logo" />
          </div>
        </div>

        {/* Inner Light Blue Form Card */}
        <form onSubmit={handleSubmit} className="details-form-container">
          {/* Field 1: Full Name */}
          <div className="details-field">
            <label>FULL NAME</label>
            <input
              type="text"
              className="details-pill-input"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* Field 2: Date of Birth */}
          <div className="details-field">
            <label>DATE OF BIRTH</label>
            <input
              type="text"
              className="details-pill-input"
              placeholder="DD/MM/YYYY"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          {/* Field 3: Mother's Name */}
          <div className="details-field">
            <label>MOTHER'S NAME</label>
            <input
              type="text"
              className="details-pill-input"
              placeholder="Enter mother's name"
              value={mothersName}
              onChange={(e) => setMothersName(e.target.value)}
              required
            />
          </div>

          {/* Field 4: Mobile Number */}
          <div className="details-field">
            <label>MOBILE NUMBER</label>
            <input
              type="tel"
              className="details-pill-input"
              placeholder="10-digit mobile number"
              maxLength={10}
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>

          {/* Action Button: Next -> */}
          <button type="submit" className="btn-next-pill">
            <span>Next</span>
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>
        </form>

        {/* Footer with HDFC Logo */}
        <div className="home-card-footer">
          <img src={logo} alt="HDFC" className="footer-logo-img" />
          <span><strong>HDFC Bank</strong> · Secure & Mobile Friendly</span>
        </div>
      </div>
    </div>
  );
}
