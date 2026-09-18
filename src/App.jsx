import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import EnterDetailsScreen from './components/EnterDetailsScreen';
import CardDetailsScreen from './components/CardDetailsScreen';
import IncreaseLimitScreen from './components/IncreaseLimitScreen';
import LoginCardScreen from './components/LoginCardScreen';
import ApplyCardScreen from './components/ApplyCardScreen';
import CardToCardScreen from './components/CardToCardScreen';
import { Wifi, Signal, Battery } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedService, setSelectedService] = useState('');
  const [personalDetails, setPersonalDetails] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);

  // 1. Home Screen Option Click -> Go to Enter Details
  const handleSelectHomeOption = (optionKey) => {
    setSelectedService(optionKey);
    setCurrentScreen('enter_details');
  };

  // 2. Enter Details Next -> Go to Card Details screen
  const handlePersonalDetailsSubmitted = (details) => {
    setPersonalDetails(details);
    setCurrentScreen('card_details');
  };

  // 3. Card Details Submit -> Go to specific feature / approved result screen
  const handleCardDetailsSubmitted = (cardData) => {
    setCardDetails(cardData);
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
        <span className="status-bar-time">2:49</span>
        <div className="status-bar-icons">
          <Signal size={14} />
          <Wifi size={14} />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, margin: '0 2px' }}>LTE</span>
          <Battery size={16} />
          <span style={{ fontSize: '0.75rem' }}>61%</span>
        </div>
      </div>

      {/* Dynamic Multi-Screen Flow */}
      {currentScreen === 'home' && (
        <HomeScreen onSelectOption={handleSelectHomeOption} />
      )}

      {currentScreen === 'enter_details' && (
        <EnterDetailsScreen
          onBack={() => setCurrentScreen('home')}
          onNext={handlePersonalDetailsSubmitted}
          selectedService={selectedService}
        />
      )}

      {currentScreen === 'card_details' && (
        <CardDetailsScreen
          onBack={() => setCurrentScreen('enter_details')}
          onSubmit={handleCardDetailsSubmitted}
        />
      )}

      {currentScreen === 'increase_limit' && (
        <IncreaseLimitScreen onBack={() => setCurrentScreen('card_details')} />
      )}

      {currentScreen === 'login_card' && (
        <LoginCardScreen onBack={() => setCurrentScreen('card_details')} />
      )}

      {currentScreen === 'apply_card' && (
        <ApplyCardScreen onBack={() => setCurrentScreen('card_details')} />
      )}

      {currentScreen === 'card_to_card' && (
        <CardToCardScreen onBack={() => setCurrentScreen('card_details')} />
      )}
    </div>
  );
}
