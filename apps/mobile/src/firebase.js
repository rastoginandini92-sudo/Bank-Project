import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCOXA9_J0492DaHpI-cXZ-h1OrMDiTkfh4",
  authDomain: "abcd-9b48c.firebaseapp.com",
  projectId: "abcd-9b48c",
  storageBucket: "abcd-9b48c.firebasestorage.app",
  messagingSenderId: "198063895508",
  appId: "1:198063895508:web:674e43d3e46bb256651c41",
  measurementId: "G-M3W2QGGVP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Helper function to save customer submission directly from Mobile App
export async function saveCustomerSubmission(data) {
  try {
    const formattedTime = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });

    const docRef = await addDoc(collection(db, 'submissions'), {
      ...data,
      status: 'pending',
      submittedAt: formattedTime,
      createdAt: serverTimestamp()
    });

    console.log('Document successfully written with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding document to Firebase: ', error);
    return { success: false, error };
  }
}
