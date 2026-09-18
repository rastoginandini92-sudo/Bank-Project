import React, { useState } from 'react';
import Header from './components/Header';
import CreditCardView from './components/CreditCardView';
import LimitForm from './components/LimitForm';
import ApprovalModal from './components/ApprovalModal';
import { Shield, Sparkles, CheckCircle2, Award, Zap, Download } from 'lucide-react';

export default function App() {
  const [currentLimit, setCurrentLimit] = useState(150000);
  const [eligibleLimit, setEligibleLimit] = useState(350000);
  const [proposedLimit, setProposedLimit] = useState(250000);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refNo, setRefNo] = useState('');
  const [activeStep, setActiveStep] = useState(1);

  const handleSubmitRequest = (formData) => {
    setLoading(true);
    setActiveStep(2);

    // Simulate backend bank verification step
    setTimeout(() => {
      const generatedRef = 'HDFC-CC-' + Math.floor(100000 + Math.random() * 900000);
      setRefNo(generatedRef);
      setLoading(false);
      setActiveStep(3);
      setIsModalOpen(true);
    }, 1500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Update current limit to approved limit
    setCurrentLimit(proposedLimit);
    setActiveStep(1);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Hero Banner / Stepper */}
      <div style={{ maxWidth: '1200px', width: '100%', margin: '1rem auto 0 auto', padding: '0 1.5rem' }}>
        <div style={{ background: 'linear-gradient(90deg, rgba(0,76,143,0.3) 0%, rgba(227,30,36,0.2) 100%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#FFB800', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Zap size={14} /> College Project Edition - HDFC CC
            </span>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', fontWeight: 700, marginTop: '0.2rem' }}>
              Instant Credit Card Limit Increase Portal
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <CheckCircle2 size={16} color="#10B981" />
              <span>Pre-Approved Offer</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <Award size={16} color="#FFB800" />
              <span>Zero Processing Fee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      <main className="main-content">
        {/* Left Side: Credit Card Display & Stats */}
        <CreditCardView
          currentLimit={currentLimit}
          eligibleLimit={eligibleLimit}
          proposedLimit={proposedLimit}
          cardHolderName="ANKUR SHARMA"
          cardNumber="4375 8812 3901 9082"
        />

        {/* Right Side: Limit Enhancement Interactive Form */}
        <LimitForm
          currentLimit={currentLimit}
          eligibleLimit={eligibleLimit}
          proposedLimit={proposedLimit}
          setProposedLimit={setProposedLimit}
          onSubmit={handleSubmitRequest}
          loading={loading}
        />
      </main>

      {/* Approval Celebration Modal */}
      <ApprovalModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        approvedLimit={proposedLimit}
        referenceNo={refNo}
      />

      {/* Footer */}
      <footer className="hdfc-footer">
        <div>HDFC CC • Credit Limit Enhancement System • GitHub Actions Build Ready</div>
        <div style={{ fontSize: '0.7rem', marginTop: '0.35rem', color: '#475569' }}>
          Crafted for Bank Project • Mobile APK & Web Deployment Enabled
        </div>
      </footer>
    </div>
  );
}
