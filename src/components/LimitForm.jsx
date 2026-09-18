import React, { useState } from 'react';
import { Sliders, ArrowRight, ShieldCheck, Lock, Smartphone, CreditCard } from 'lucide-react';

export default function LimitForm({ currentLimit, eligibleLimit, proposedLimit, setProposedLimit, onSubmit, loading }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [last4Card, setLast4Card] = useState('');
  const [incomeType, setIncomeType] = useState('salaried');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ mobileNumber, last4Card, incomeType, proposedLimit });
  };

  return (
    <div className="glass-panel">
      <div className="form-title-group">
        <h2>
          <Sliders size={22} color="#E31E24" />
          Enhance Credit Limit
        </h2>
        <p>Adjust your desired new credit limit and complete quick verification.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Slider control */}
        <div className="slider-container">
          <div className="slider-header">
            <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Select New Desired Limit</span>
            <div className="slider-value-badge">₹{proposedLimit.toLocaleString('en-IN')}</div>
          </div>

          <input
            type="range"
            className="range-slider"
            min={currentLimit}
            max={eligibleLimit}
            step={10000}
            value={proposedLimit}
            onChange={(e) => setProposedLimit(Number(e.target.value))}
          />

          <div className="slider-labels">
            <span>Current: ₹{currentLimit.toLocaleString('en-IN')}</span>
            <span>Max Pre-Approved: ₹{eligibleLimit.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Input verification fields */}
        <div className="input-group">
          <label>
            <Smartphone size={16} /> Registered Mobile Number
          </label>
          <input
            type="tel"
            className="custom-input"
            placeholder="Enter 10-digit mobile number"
            maxLength={10}
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>
            <CreditCard size={16} /> Last 4 Digits of HDFC Credit Card
          </label>
          <input
            type="text"
            className="custom-input"
            placeholder="e.g. 9082"
            maxLength={4}
            value={last4Card}
            onChange={(e) => setLast4Card(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Employment / Income Profile</label>
          <select
            className="custom-input"
            value={incomeType}
            onChange={(e) => setIncomeType(e.target.value)}
            style={{ color: 'white', background: '#081a36' }}
          >
            <option value="salaried">Salaried Individual</option>
            <option value="self_employed">Self Employed / Business</option>
            <option value="professional">Professional (Doctor, CA, Architect)</option>
          </select>
        </div>

        <div style={{ margin: '1.25rem 0', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Lock size={14} color="#0072CE" />
          <span>256-Bit SSL Encrypted Banking Connection</span>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? (
            <span>Processing Application...</span>
          ) : (
            <>
              <span>Submit Limit Increase Request</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
