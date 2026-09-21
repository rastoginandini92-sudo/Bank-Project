import React, { useState } from 'react';
import { ArrowLeft, Repeat, CheckCircle2 } from 'lucide-react';

export default function CardToCardScreen({ onBack }) {
  const [fromCard, setFromCard] = useState('');
  const [toCard, setToCard] = useState('');
  const [amount, setAmount] = useState('');
  const [done, setDone] = useState(false);

  const handleTransfer = (e) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <div>
      <div className="inner-screen-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <div className="inner-screen-title">Card to Card Transfer</div>
      </div>

      <div className="inner-screen-body">
        {!done ? (
          <div className="glass-panel-inner">
            <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
              <Repeat size={36} color="#043874" style={{ margin: '0 auto 0.5rem auto' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#05264e' }}>Balance Transfer</h3>
              <p style={{ fontSize: '0.82rem', color: '#4c688b' }}>Transfer credit line or pay bills from another card instantly.</p>
            </div>

            <form onSubmit={handleTransfer}>
              <div className="form-field">
                <label>Source HDFC Card Number</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Source 16-digit card number"
                  maxLength={16}
                  value={fromCard}
                  onChange={(e) => setFromCard(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label>Destination Card Number</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Destination 16-digit card number"
                  maxLength={16}
                  value={toCard}
                  onChange={(e) => setToCard(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label>Transfer Amount (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Enter amount (e.g. 25000)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-action-primary" style={{ marginTop: '0.8rem' }}>
                Process Card to Card Transfer
              </button>
            </form>
          </div>
        ) : (
          <div className="glass-panel-inner" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <CheckCircle2 size={56} color="#10B981" style={{ margin: '0 auto 0.8rem auto' }} />
            <h3 style={{ fontSize: '1.2rem', color: '#05264e', marginBottom: '0.3rem' }}>Transfer Successful</h3>
            <p style={{ fontSize: '0.85rem', color: '#4c688b', marginBottom: '1rem' }}>
              ₹{Number(amount).toLocaleString('en-IN')} has been transferred successfully between cards. Txn ID: <strong>TXN-991823</strong>
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
