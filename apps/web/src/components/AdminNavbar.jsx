import React from 'react';
import { ShieldCheck, Bell, User } from 'lucide-react';
import logo from '../assets/logo.png';

export default function AdminNavbar({ onQuickAction }) {
  return (
    <header className="admin-navbar">
      <div className="nav-left">
        <div className="nav-logo-box">
          <img src={logo} alt="HDFC Bank" className="nav-logo-img" />
        </div>
        <div className="nav-title-group">
          <h1>HDFC Bank</h1>
          <span className="nav-badge-portal">Card Services · Web Admin Portal</span>
        </div>
      </div>

      <div className="nav-right">
        <div className="nav-live-indicator">
          <span className="live-pulse-dot"></span>
          <span>System Live · Node Sync Active</span>
        </div>

        <div className="nav-admin-profile">
          <div className="profile-avatar">
            <User size={18} />
          </div>
          <div className="profile-info">
            <span className="profile-name">Branch Admin Officer</span>
            <span className="profile-role">ID: HDFC-EMP-9821</span>
          </div>
        </div>
      </div>
    </header>
  );
}
