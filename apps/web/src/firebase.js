import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';

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

// Subscribe to real-time submissions from Firebase Firestore
export function subscribeToSubmissions(onUpdate, onError) {
  const submissionsRef = collection(db, 'submissions');
  const q = query(submissionsRef, orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      onUpdate(items);
    },
    (error) => {
      console.warn('Firestore subscription notice (check rules if permission denied):', error);
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
