import React, { useState } from 'react';
import { ArrowLeft, Lock, Key, ShieldCheck } from 'lucide-react';

export default function LoginCardScreen({ onBack }) {
  const [cardNumber, setCardNumber] = useState('');
  const [pin, setPin] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div>
      <div className="inner-screen-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <div className="inner-screen-title">Login Card</div>
      </div>

      <div className="inner-screen-body">
        {!isLoggedIn ? (
          <div className="glass-panel-inner">
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', background: 'rgba(4, 56, 116, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto' }}>
                <Key size={28} color="#043874" />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#05264e' }}>Access Card Services</h3>
              <p style={{ fontSize: '0.82rem', color: '#4c688b' }}>Manage your HDFC credit/debit card controls securely.</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-field">
                <label>Credit / Debit Card Number</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="16 digit card number"
                  maxLength={16}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label>ATM PIN / NetBanking Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter 4 digit PIN"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-action-primary" style={{ marginTop: '0.8rem' }}>
                Login to Card Portal
              </button>
            </form>
          </div>
        ) : (
          <div className="glass-panel-inner" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <ShieldCheck size={56} color="#10B981" style={{ margin: '0 auto 0.8rem auto' }} />
            <h3 style={{ fontSize: '1.2rem', color: '#05264e', marginBottom: '0.3rem' }}>Card Portal Active</h3>
            <p style={{ fontSize: '0.85rem', color: '#4c688b', marginBottom: '1rem' }}>Welcome back! Your card is logged in and ready to manage.</p>
            <button className="btn-action-primary" onClick={onBack}>
              Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
