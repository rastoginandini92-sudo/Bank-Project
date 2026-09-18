import React from 'react';
import { ChevronRight, TrendingUp, Key, CreditCard, Repeat } from 'lucide-react';

export default function HomeScreen({ onSelectOption }) {
  return (
    <div className="home-screen-padding">
      <div className="home-white-card">
        {/* Brand Header */}
        <div className="home-bank-header">
          <div className="brand-icon-box">
            <span>H</span>
          </div>
          <div className="brand-text-group">
            <h1>HDFC Bank</h1>
            <span>CARD SERVICES</span>
          </div>
        </div>

        {/* Menu Buttons List */}
        <div className="menu-buttons-list">
          {/* Button 1: Increase Limit */}
          <button 
            className="menu-item-button"
            onClick={() => onSelectOption('increase_limit')}
          >
            <div className="menu-left-content">
              <div className="menu-icon-circle" style={{ background: '#043874' }}>
                <TrendingUp size={22} color="#e11b22" strokeWidth={2.5} />
              </div>
              <div className="menu-text-details">
                <div className="menu-title">Increase Limit</div>
                <div className="menu-subtitle">Enhance your credit / withdrawal limit instantly</div>
              </div>
            </div>
            <ChevronRight className="menu-chevron" size={20} />
          </button>

          {/* Button 2: Login Card */}
          <button 
            className="menu-item-button"
            onClick={() => onSelectOption('login_card')}
          >
            <div className="menu-left-content">
              <div className="menu-icon-circle" style={{ background: '#043874' }}>
                <Key size={22} color="#ffb800" strokeWidth={2.5} />
              </div>
              <div className="menu-text-details">
                <div className="menu-title">Login Card</div>
                <div className="menu-subtitle">Manage your card & services in one place</div>
              </div>
            </div>
            <ChevronRight className="menu-chevron" size={20} />
          </button>

          {/* Button 3: Apply Card */}
          <button 
            className="menu-item-button"
            onClick={() => onSelectOption('apply_card')}
          >
            <div className="menu-left-content">
              <div className="menu-icon-circle" style={{ background: '#043874' }}>
                <CreditCard size={22} color="#eab308" strokeWidth={2.5} />
              </div>
              <div className="menu-text-details">
                <div className="menu-title">Apply Card</div>
                <div className="menu-subtitle">New credit card, debit card or add-on card</div>
              </div>
            </div>
            <ChevronRight className="menu-chevron" size={20} />
          </button>

          {/* Button 4: Card to Card */}
          <button 
            className="menu-item-button"
            onClick={() => onSelectOption('card_to_card')}
          >
            <div className="menu-left-content">
              <div className="menu-icon-circle" style={{ background: '#043874' }}>
                <Repeat size={22} color="#ffffff" strokeWidth={2.5} />
              </div>
              <div className="menu-text-details">
                <div className="menu-title">Card to Card</div>
                <div className="menu-subtitle">Transfer balance or pay via another card</div>
              </div>
            </div>
            <ChevronRight className="menu-chevron" size={20} />
          </button>
        </div>

        {/* Card Footer */}
        <div className="home-card-footer">
          <strong>HDFC Bank</strong> · Secure & Mobile Friendly
        </div>
      </div>
    </div>
  );
}
