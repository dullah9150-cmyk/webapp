import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPPpY6N9_IKUul160nLZoCrCfG7EOKE98",
  authDomain: "webapp-1a4af.firebaseapp.com",
  projectId: "webapp-1a4af",
  storageBucket: "webapp-1a4af.firebasestorage.app",
  messagingSenderId: "343666693803",
  appId: "1:343666693803:web:2a76387400bff2f2ebc9ee",
};

let app;
let auth;
let db;

try {
  console.log('Initializing Firebase...');
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  throw error; // Re-throw to stop the app if Firebase fails
}

export { auth, db };
export default app;