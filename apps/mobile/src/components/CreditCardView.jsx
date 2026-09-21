import React from 'react';
import { CreditCard, Wifi, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import logo from '../assets/logo.png';

export default function CreditCardView({ currentLimit, eligibleLimit, proposedLimit, cardHolderName, cardNumber }) {
  const usagePercentage = Math.round((currentLimit / eligibleLimit) * 100);

  return (
    <div className="card-display-container">
      {/* 3D Visual Credit Card */}
      <div className="cc-visual">
        <div className="cc-header">
          <div className="cc-bank-logo">
            <img src={logo} alt="HDFC Bank" style={{ height: '18px' }} />
          </div>
          <span className="cc-type">REGALIA GOLD</span>
        </div>

        <div className="cc-chip-section">
          <div className="cc-chip"></div>
          <Wifi className="cc-nfc" size={20} />
        </div>

        <div className="cc-number">
          {cardNumber || '4375 •••• •••• 9082'}
        </div>

        <div className="cc-footer">
          <div>
            <div className="cc-holder-label">CARDHOLDER</div>
            <div className="cc-holder-name">{cardHolderName || 'ANKUR SHARMA'}</div>
          </div>
          <div>
            <div className="cc-holder-label">EXPIRES</div>
            <div className="cc-expiry">08/29</div>
          </div>
        </div>
      </div>

      {/* Credit Limit Metric Overview */}
      <div className="glass-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="#0072CE" />
            Credit Overview
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
            Instant Pre-Approved
          </span>
        </div>

        <div className="limit-metrics-grid">
          <div className="metric-box">
            <div className="metric-label">Current Limit</div>
            <div className="metric-val current">₹{currentLimit.toLocaleString('en-IN')}</div>
          </div>

          <div className="metric-box">
            <div className="metric-label">Max Eligible Limit</div>
            <div className="metric-val eligible">₹{eligibleLimit.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94A3B8', marginBottom: '0.35rem' }}>
            <span>Requested Enhancement: <strong>₹{proposedLimit.toLocaleString('en-IN')}</strong></span>
            <span>{Math.round((proposedLimit / eligibleLimit) * 100)}% of Max</span>
          </div>

          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${Math.min(100, Math.max(10, (proposedLimit / eligibleLimit) * 100))}%` }}
            ></div>
          </div>
        </div>

        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: '#94A3B8' }}>
          <CheckCircle2 size={16} color="#10B981" />
          <span>Zero Documentation required for pre-approved increase up to ₹{eligibleLimit.toLocaleString('en-IN')}.</span>
        </div>
      </div>
    </div>
  );
}
