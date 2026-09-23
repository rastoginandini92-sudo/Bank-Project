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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
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

// Subscribe to real-time submissions from Firebase Firestore (Admin Portal)
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
