import React, { useEffect } from 'react';
import { Check, Timer } from 'lucide-react';
import confetti from 'canvas-confetti';
import logo from '../assets/logo.png';

export default function ConfirmationScreen({ onReset }) {
  useEffect(() => {
    // Trigger celebration confetti
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.5 }
    });
  }, []);

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

        {/* Inner Light Blue Confirmation Card */}
        <div className="confirmation-blue-card">
          {/* Green Check Icon inside Dark Blue Badge */}
          <div className="confirmation-check-badge">
            <div className="check-green-box">
              <Check size={24} strokeWidth={3.5} />
            </div>
          </div>

          {/* Title */}
          <h2 className="confirmation-title">
            Thank You for Using<br />HDFC Application
          </h2>

          {/* Subtexts */}
          <div className="confirmation-subtext">
            <p>Your details have been submitted successfully.</p>
            <p style={{ marginTop: '0.4rem' }}>
              Your card is currently <strong>under verification</strong>.
            </p>
          </div>

          {/* Badge 1: Verification Time */}
          <div className="confirmation-badge-pill">
            <div className="stopwatch-icon-wrapper">
              <Timer size={20} strokeWidth={2} />
            </div>
            <div className="time-badge-text">
              <span className="time-badge-label">VERIFICATION TIME</span>
              <span className="time-badge-value">18 Hours</span>
            </div>
          </div>

          {/* Badge 2: Verification Status */}
          <div className="status-badge-pill" onClick={onReset} style={{ cursor: 'pointer' }}>
            <span className="dot-amber"></span>
            <span>Verification in progress</span>
          </div>
        </div>

        {/* Footer */}
        <div className="home-card-footer">
          <img src={logo} alt="HDFC" className="footer-logo-img" />
          <span><strong>HDFC Bank</strong> · Secure & Mobile Friendly</span>
        </div>
      </div>
    </div>
  );
}
