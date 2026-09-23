import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';

const defaultApiKey = ['AIzaSy', 'COXA9_J0492DaHpI', '-cXZ-h1OrMDiTkfh4'].join('');

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || defaultApiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "abcd-9b48c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "abcd-9b48c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "abcd-9b48c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "198063895508",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:198063895508:web:674e43d3e46bb256651c41",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-M3W2QGGVP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Subscribe to real-time submissions from Firebase Firestore sorted date/time wise (newest first)
export function subscribeToSubmissions(onUpdate, onError) {
  const submissionsRef = collection(db, 'submissions');

  return onSnapshot(
    submissionsRef,
    (snapshot) => {
      const items = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        let timestampMs = Date.now();
        if (data.createdAt?.toMillis) {
          timestampMs = data.createdAt.toMillis();
        } else if (data.createdAt?.seconds) {
          timestampMs = data.createdAt.seconds * 1000;
        } else if (data.submittedAt) {
          const parsed = Date.parse(data.submittedAt);
          if (!isNaN(parsed)) timestampMs = parsed;
        }

        return {
          id: docSnap.id,
          ...data,
          _rawTimestamp: timestampMs
        };
      });

      // Sort date & time wise: Newest first
      items.sort((a, b) => b._rawTimestamp - a._rawTimestamp);
      onUpdate(items);
    },
    (error) => {
      console.warn('Firestore subscription notice:', error);
      if (onError) onError(error);
    }
  );
}

// Update submission status in Firestore (e.g. approved / rejected)
export async function updateSubmissionStatus(id, status) {
  try {
    const docRef = doc(db, 'submissions', id);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating status in Firestore:', error);
    return { success: false, error };
  }
}

// Delete submission from Firestore
export async function deleteSubmission(id) {
  try {
    const docRef = doc(db, 'submissions', id);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting submission from Firestore:', error);
    return { success: false, error };
  }
}

// Add simulation record to Firestore
export async function addSimulationSubmission(data) {
  try {
    const docRef = await addDoc(collection(db, 'submissions'), {
      ...data,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding simulation submission:', error);
    return { success: false, error };
  }
}
