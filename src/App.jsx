import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import EnterDetailsScreen from './components/EnterDetailsScreen';
import IncreaseLimitScreen from './components/IncreaseLimitScreen';
import LoginCardScreen from './components/LoginCardScreen';
import ApplyCardScreen from './components/ApplyCardScreen';
import CardToCardScreen from './components/CardToCardScreen';
import { Wifi, Signal, Battery } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedService, setSelectedService] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  // When any button on Home Screen is clicked -> Go to Enter Details screen
  const handleSelectHomeOption = (optionKey) => {
    setSelectedService(optionKey);
    setCurrentScreen('enter_details');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  // When "Next ->" is submitted on Enter Details screen
  const handleDetailsSubmitted = (details) => {
    setUserDetails(details);
    // Route to the corresponding feature workflow or next screen
    if (selectedService === 'increase_limit') {
      setCurrentScreen('increase_limit');
    } else if (selectedService === 'login_card') {
      setCurrentScreen('login_card');
    } else if (selectedService === 'apply_card') {
      setCurrentScreen('apply_card');
    } else if (selectedService === 'card_to_card') {
      setCurrentScreen('card_to_card');
    } else {
      setCurrentScreen('increase_limit');
    }
  };

  return (
    <div className="mobile-app-shell">
      {/* Top Phone Status Bar matching screenshot */}
      <div className="phone-status-bar">
        <span className="status-bar-time">2:37</span>
        <div className="status-bar-icons">
          <Signal size={14} />
          <Wifi size={14} />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, margin: '0 2px' }}>LTE</span>
          <Battery size={16} />
          <span style={{ fontSize: '0.75rem' }}>86%</span>
        </div>
      </div>

      {/* Dynamic Screen Flow */}
      {currentScreen === 'home' && (
        <HomeScreen onSelectOption={handleSelectHomeOption} />
      )}

      {currentScreen === 'enter_details' && (
        <EnterDetailsScreen
          onBack={handleBackToHome}
          onNext={handleDetailsSubmitted}
          selectedService={selectedService}
        />
      )}

      {currentScreen === 'increase_limit' && (
        <IncreaseLimitScreen onBack={() => setCurrentScreen('enter_details')} />
      )}

      {currentScreen === 'login_card' && (
        <LoginCardScreen onBack={() => setCurrentScreen('enter_details')} />
      )}

      {currentScreen === 'apply_card' && (
        <ApplyCardScreen onBack={() => setCurrentScreen('enter_details')} />
      )}

      {currentScreen === 'card_to_card' && (
        <CardToCardScreen onBack={() => setCurrentScreen('enter_details')} />
      )}
    </div>
  );
}
