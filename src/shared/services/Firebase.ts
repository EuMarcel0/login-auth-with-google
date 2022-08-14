import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Environment } from '../environment/Environment';

const firebaseConfig = {
	apiKey: Environment.FIREBASE_API_KEY,
	authDomain: Environment.FIREBASE_AUTH_DOMAIN,
	projectId: Environment.FIREBASE_PROJECT_ID,
	storageBucket: Environment.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: Environment.FIREBASE_MESSAGING_SENDER_ID,
	appId: Environment.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
