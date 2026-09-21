import React, { useEffect } from 'react';
import { Check, X, ShieldCheck, Download, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ApprovalModal({ isOpen, onClose, approvedLimit, referenceNo }) {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div className="modal-icon-success">
          <Check size={40} strokeWidth={3} />
        </div>

        <h3>Limit Increase Approved!</h3>
        <p>Congratulations! Your HDFC Credit Card limit upgrade request has been instantly verified and granted.</p>

        <div className="new-limit-badge">
          <div className="lbl">New Credit Limit</div>
          <div className="amount">₹{approvedLimit.toLocaleString('en-IN')}</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.8rem', color: '#94A3B8', marginBottom: '1.5rem', textAlign: 'left' }}>
          <div>Reference No: <strong style={{ color: 'white' }}>{referenceNo || 'HDFC-CC-9823471'}</strong></div>
          <div>Effective Date: <strong style={{ color: 'white' }}>Immediate Activation</strong></div>
        </div>

        <button className="btn-primary" onClick={onClose}>
          <Sparkles size={18} />
          <span>Done & Return to Dashboard</span>
        </button>
      </div>
    </div>
  );
}
