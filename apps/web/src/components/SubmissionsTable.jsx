import React from 'react';
import { Eye, Check, X, TrendingUp, Key, Gift, Repeat, Search, RefreshCw, Download, FileSpreadsheet } from 'lucide-react';

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
  onExportCSV,
  onRefresh
}) {
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
        return <span className="service-tag">{service || 'Card Services'}</span>;
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
              placeholder="Search by Name, PAN, or Mobile..."
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
          <button className="btn-secondary" onClick={onExportCSV} title="Export CSV">
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>PAN Card No.</th>
              <th>Mobile</th>
              <th>DOB</th>
              <th>Service Type</th>
              <th>Card / Limit Info</th>
              <th>Submitted At</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                  No customer applications found matching criteria.
                </td>
              </tr>
            ) : (
              submissions.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#002d62' }}>{item.fullName}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Mother: {item.mothersName}</div>
                  </td>
                  <td>
                    <span className="pan-badge">{item.panNumber || '—'}</span>
                  </td>
                  <td className="mono-cell">{item.mobileNumber}</td>
                  <td>{item.dob}</td>
                  <td>{getServiceBadge(item.selectedService)}</td>
                  <td>
                    {item.cardNumber ? (
                      <span className="card-num-badge">
                        •••• {item.cardNumber.slice(-4)}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Limit Upgrade Request</span>
                    )}
                  </td>
                  <td style={{ fontSize: '0.78rem', color: '#64748b' }}>{item.submittedAt}</td>
                  <td>{getStatusPill(item.status)}</td>
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
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
