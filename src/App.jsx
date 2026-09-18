import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import IncreaseLimitScreen from './components/IncreaseLimitScreen';
import LoginCardScreen from './components/LoginCardScreen';
import ApplyCardScreen from './components/ApplyCardScreen';
import CardToCardScreen from './components/CardToCardScreen';
import { Wifi, Signal, Battery } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const handleSelectOption = (optionKey) => {
    setCurrentScreen(optionKey);
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  return (
    <div className="mobile-app-shell">
      {/* Top Phone Status Bar matching screenshot */}
      <div className="phone-status-bar">
        <span className="status-bar-time">2:03</span>
        <div className="status-bar-icons">
          <Signal size={14} />
          <Wifi size={14} />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, margin: '0 2px' }}>LTE</span>
          <Battery size={16} />
          <span style={{ fontSize: '0.75rem' }}>88%</span>
        </div>
      </div>

      {/* Dynamic Screen Renderer */}
      {currentScreen === 'home' && (
        <HomeScreen onSelectOption={handleSelectOption} />
      )}

      {currentScreen === 'increase_limit' && (
        <IncreaseLimitScreen onBack={handleBackToHome} />
      )}

      {currentScreen === 'login_card' && (
        <LoginCardScreen onBack={handleBackToHome} />
      )}

      {currentScreen === 'apply_card' && (
        <ApplyCardScreen onBack={handleBackToHome} />
      )}

      {currentScreen === 'card_to_card' && (
        <CardToCardScreen onBack={handleBackToHome} />
      )}
    </div>
  );
}
