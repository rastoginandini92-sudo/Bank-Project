import React from 'react';
import { ShieldCheck, Cpu, Github } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className="hdfc-header">
      <div className="brand-section">
        <div className="brand-logo-wrapper">
          <img src={logo} alt="HDFC Bank Logo" className="brand-logo" />
        </div>
        <div className="brand-title-group">
          <h1>HDFC CC</h1>
          <div className="brand-subtitle">
            <ShieldCheck size={12} color="#10B981" />
            <span>Credit Limit Enhancement Portal</span>
          </div>
        </div>
      </div>

      <div className="header-actions">
        <div className="mode-badge">
          <Cpu size={14} />
          <span>GitHub Build Ready</span>
        </div>
      </div>
    </header>
  );
}
