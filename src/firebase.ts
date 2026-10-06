import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNLkp_i_tmjElTW9zFkICXL1X3__k-oXI",
  authDomain: "malvinka-e4127.firebaseapp.com",
  projectId: "malvinka-e4127",
  storageBucket: "malvinka-e4127.firebasestorage.app",
  messagingSenderId: "875502969233",
  appId: "1:875502969233:web:9a9640048f045171d17a30",
  measurementId: "G-193YBKSZ9E"
};

const app = initializeApp(firebaseConfig);

// This 'export' keyword is what Vercel is looking for!
export const db = getFirestore(app);
