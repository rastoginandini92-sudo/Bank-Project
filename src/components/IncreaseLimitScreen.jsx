import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function IncreaseLimitScreen({ onBack }) {
  const [currentLimit, setCurrentLimit] = useState(150000);
  const [eligibleLimit] = useState(350000);
  const [proposedLimit, setProposedLimit] = useState(250000);
  const [mobile, setMobile] = useState('');
  const [last4, setLast4] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <div>
      <div className="inner-screen-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <div className="inner-screen-title">Increase Credit Limit</div>
      </div>

      <div className="inner-screen-body">
        {!submitted ? (
          <div className="glass-panel-inner">
            <div style={{ marginBottom: '1.2rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#4c688b', fontWeight: 600 }}>PRE-APPROVED ELIGIBILITY</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#043874' }}>
                Up to ₹{eligibleLimit.toLocaleString('en-IN')}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label>Desired New Limit (₹{proposedLimit.toLocaleString('en-IN')})</label>
                <input
                  type="range"
                  min={currentLimit}
                  max={eligibleLimit}
                  step={10000}
                  value={proposedLimit}
                  onChange={(e) => setProposedLimit(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#043874' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#4c688b', marginTop: '0.3rem' }}>
                  <span>Current: ₹{currentLimit.toLocaleString('en-IN')}</span>
                  <span>Max: ₹{eligibleLimit.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="form-field">
                <label>Registered Mobile Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Enter 10 digit mobile number"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label>Last 4 Digits of Credit Card</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 9082"
                  maxLength={4}
                  value={last4}
                  onChange={(e) => setLast4(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-action-primary" style={{ marginTop: '0.8rem' }}>
                Submit Limit Enhancement Request
              </button>
            </form>
          </div>
        ) : (
          <div className="glass-panel-inner" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={64} color="#10B981" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.3rem', color: '#05264e', marginBottom: '0.5rem' }}>
              Request Approved!
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#4c688b', marginBottom: '1.2rem' }}>
              Your HDFC Credit Card limit has been enhanced to <strong>₹{proposedLimit.toLocaleString('en-IN')}</strong> instantly.
            </p>
            <button className="btn-action-primary" onClick={onBack}>
              Back to Card Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
