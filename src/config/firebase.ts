// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

// Firebase yapılandırması - Çevre değişkenlerini kullan veya varsayılan değerler
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyACFUT3JF6CuYkqEvUHt3JF_l9hoSEZIHw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "deneme-ca220.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://deneme-ca220-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "deneme-ca220",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "deneme-ca220.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "315103781728",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:315103781728:web:906be1dfdf3a50633cb405",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-FS254NEFYN"
};

let app;
let auth;
let database;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase initialized successfully');

  // Initialize Firebase Authentication and get a reference to the service
  auth = getAuth(app);
  
  // Initialize Realtime Database and get a reference to the service
  database = getDatabase(app);
  
  console.log('✅ Firebase Auth and Database initialized');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  // Fallback - boş objeler döndür
  throw new Error('Firebase could not be initialized. Please check your configuration.');
}

export { auth, database };
export default app;
