import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ApplyCardScreen({ onBack }) {
  const [cardType, setCardType] = useState('regalia');
  const [name, setName] = useState('');
  const [applied, setApplied] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    setApplied(true);
  };

  return (
    <div>
      <div className="inner-screen-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <div className="inner-screen-title">Apply New Card</div>
      </div>

      <div className="inner-screen-body">
        {!applied ? (
          <div className="glass-panel-inner">
            <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
              <CreditCard size={36} color="#043874" style={{ margin: '0 auto 0.5rem auto' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#05264e' }}>Apply for HDFC Card</h3>
              <p style={{ fontSize: '0.82rem', color: '#4c688b' }}>Select your preferred credit or debit card variant.</p>
            </div>

            <form onSubmit={handleApply}>
              <div className="form-field">
                <label>Select Card Variant</label>
                <select
                  className="form-input"
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
                >
                  <option value="regalia">HDFC Regalia Gold Credit Card</option>
                  <option value="millennia">HDFC Millennia Cashback Card</option>
                  <option value="diners">HDFC Diners Club Black</option>
                  <option value="addon">Add-On Credit Card for Family</option>
                </select>
              </div>

              <div className="form-field">
                <label>Full Name (as per Aadhaar / PAN)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-action-primary" style={{ marginTop: '0.8rem' }}>
                Submit Card Application
              </button>
            </form>
          </div>
        ) : (
          <div className="glass-panel-inner" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <CheckCircle2 size={56} color="#10B981" style={{ margin: '0 auto 0.8rem auto' }} />
            <h3 style={{ fontSize: '1.2rem', color: '#05264e', marginBottom: '0.3rem' }}>Application Submitted</h3>
            <p style={{ fontSize: '0.85rem', color: '#4c688b', marginBottom: '1rem' }}>
              Your card application for <strong>{name}</strong> has been received. Application Ref: <strong>HDFC-APP-77291</strong>
            </p>
            <button className="btn-action-primary" onClick={onBack}>
              Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
