import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "malvinka-xxxx.firebaseapp.com",
  projectId: "malvinka-xxxx",
  storageBucket: "malvinka-xxxx.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

// This 'export' keyword is what Vercel is looking for!
export const db = getFirestore(app);
