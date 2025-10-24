// Firebase Admin SDK Configuration
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let firebaseApp = null;

export const initializeFirebase = () => {
  if (firebaseApp) {
    return firebaseApp;
  }

  try {
    // Try to load service account key
    const serviceAccountPath = join(__dirname, 'serviceAccountKey.json');
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: serviceAccount.databaseURL || 'https://deneme-ca220-default-rtdb.firebaseio.com'
    });

    console.log('✅ Firebase Admin SDK initialized successfully');
    return firebaseApp;
  } catch (error) {
    console.warn('⚠️  Firebase Admin SDK not initialized:', error.message);
    console.log('📋 To enable Firebase:');
    console.log('   1. Go to Firebase Console → Project Settings → Service Accounts');
    console.log('   2. Click "Generate New Private Key"');
    console.log('   3. Save as: /app/backend-game/config/serviceAccountKey.json');
    console.log('   4. Restart the server');
    console.log('');
    console.log('⚡ Server will run in DEMO mode without Firebase integration');
    return null;
  }
};

export const getDatabase = () => {
  if (!firebaseApp) {
    throw new Error('Firebase not initialized');
  }
  return admin.database();
};

export const getAuth = () => {
  if (!firebaseApp) {
    throw new Error('Firebase not initialized');
  }
  return admin.auth();
};

export default { initializeFirebase, getDatabase, getAuth };
