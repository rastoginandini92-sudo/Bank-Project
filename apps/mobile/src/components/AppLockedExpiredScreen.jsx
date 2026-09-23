import React, { useState } from 'react';
import { ShieldAlert, Trash2, AlertTriangle, ExternalLink, RefreshCw, XCircle } from 'lucide-react';
import logo from '../assets/logo.png';

export default function AppLockedExpiredScreen({ onReset }) {
  const [showUninstallModal, setShowUninstallModal] = useState(false);

  const handleUninstall = () => {
    // 1. In native Android/Capacitor, try opening package uninstall intent
    try {
      if (typeof window !== 'undefined' && window.location) {
        window.location.href = 'package:com.hdfc.app';
      }
    } catch (e) {
      console.warn('Intent redirect not supported:', e);
    }

    // 2. Show interactive instructions modal for Android user
    setShowUninstallModal(true);
  };

  const handleExit = () => {
    if (typeof navigator !== 'undefined' && navigator.app?.exitApp) {
      navigator.app.exitApp();
    } else {
      window.close();
    }
  };

  return (
    <div className="home-screen-padding" style={{ background: 'linear-gradient(180deg, #fee2e2 0%, #fecaca 40%, #fee2e2 100%)', minHeight: '100vh' }}>
      <div className="home-white-card" style={{ borderTop: '5px solid #dc2626', boxShadow: '0 16px 40px rgba(220, 38, 38, 0.18)' }}>
        {/* Bank Brand Header */}
        <div className="home-bank-header">
          <div className="brand-icon-box" style={{ background: '#fef2f2', borderColor: '#fca5a5' }}>
            <img src={logo} alt="HDFC Bank Logo" />
          </div>
          <div className="brand-text-group">
            <h1 style={{ color: '#991b1b' }}>HDFC Bank</h1>
            <span style={{ color: '#dc2626', fontWeight: 800 }}>SECURITY NOTICE</span>
          </div>
        </div>

        {/* Lockout Badge */}
        <div style={{
          marginTop: '1.2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '0.8rem',
          padding: '0.5rem 0'
        }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: '#fee2e2',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 0 10px rgba(239, 68, 68, 0.15)'
          }}>
            <ShieldAlert size={36} strokeWidth={2.3} />
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#991b1b', lineHeight: 1.2 }}>
            The App is Expired
          </h2>

          <div style={{
            background: '#fef2f2',
            border: '1.5px solid #fecaca',
            borderRadius: '16px',
            padding: '1.1rem 1rem',
            textAlign: 'center',
            width: '100%'
          }}>
            <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.4rem' }}>
              Your verification request has been rejected.
            </p>
            <p style={{ fontSize: '0.8rem', color: '#7f1d1d', lineHeight: 1.45 }}>
              This version of the HDFC Bank mobile app is no longer active or supported. Please <strong>uninstall this app</strong> and install the updated official build to continue.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ width: '100%', marginTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Main Action: Uninstall App Button */}
          <button
            onClick={handleUninstall}
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '18px',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              boxShadow: '0 8px 24px rgba(220, 38, 38, 0.35)',
              transition: 'all 0.2s'
            }}
          >
            <Trash2 size={20} />
            <span>Uninstall App</span>
          </button>

          {/* Exit / Close */}
          <button
            onClick={handleExit}
            style={{
              background: '#f1f5f9',
              color: '#475569',
              border: '1px solid #cbd5e1',
              borderRadius: '14px',
              padding: '0.75rem',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}
          >
            <XCircle size={16} />
            <span>Exit Application</span>
          </button>
        </div>

        {/* Footer */}
        <div className="home-card-footer" style={{ marginTop: '1.5rem', color: '#991b1b' }}>
          <img src={logo} alt="HDFC" className="footer-logo-img" />
          <span><strong>HDFC Bank</strong> · Security Enforcement System</span>
        </div>
      </div>

      {/* Uninstall Modal / Instructions Dialog */}
      {showUninstallModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '1.5rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '1.8rem 1.4rem',
            maxWidth: '360px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}>
              <Trash2 size={28} />
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
              How to Uninstall
            </h3>

            <div style={{ textAlign: 'left', background: '#f8fafc', padding: '1rem', borderRadius: '12px', fontSize: '0.82rem', color: '#334155', lineHeight: 1.6 }}>
              <p><strong>Step 1:</strong> Go to your phone's <strong>Home Screen</strong> or <strong>App Drawer</strong>.</p>
              <p><strong>Step 2:</strong> Long-press (tap and hold) the <strong>HDFC Bank</strong> app icon.</p>
              <p><strong>Step 3:</strong> Tap <strong>Uninstall</strong> or drag to the trash icon to remove.</p>
            </div>

            <button
              onClick={() => setShowUninstallModal(false)}
              style={{
                background: '#002d62',
                color: 'white',
                border: 'none',
                padding: '0.75rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
