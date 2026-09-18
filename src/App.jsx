import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import EnterDetailsScreen from './components/EnterDetailsScreen';
import CardDetailsScreen from './components/CardDetailsScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
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

  // 3. Card Details Submit -> Go to Confirmation Screen for ALL options
  const handleCardDetailsSubmitted = (cardData) => {
    setCardDetails(cardData);
    setCurrentScreen('confirmation');
  };

  // Reset back to home screen
  const handleResetToHome = () => {
    setCurrentScreen('home');
    setSelectedService('');
    setPersonalDetails(null);
    setCardDetails(null);
  };

  return (
    <div className="mobile-app-shell">
      {/* Top Phone Status Bar matching screenshot */}
      <div className="phone-status-bar">
        <span className="status-bar-time">2:50</span>
        <div className="status-bar-icons">
          <Signal size={14} />
          <Wifi size={14} />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, margin: '0 2px' }}>LTE</span>
          <Battery size={16} />
          <span style={{ fontSize: '0.75rem' }}>61%</span>
        </div>
      </div>

      {/* Dynamic Sequential Screen Flow */}
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

      {currentScreen === 'confirmation' && (
        <ConfirmationScreen onReset={handleResetToHome} />
      )}
    </div>
  );
}
