import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

let messaging = null; // 👈 important

const firebaseConfig = {
  apiKey: "AIzaSyAgFJse-e4UGejrX3ZYnSYoa3tFAL61eTY",
  authDomain: "pahrikyns-app.firebaseapp.com",
  projectId: "pahrikyns-app",
  storageBucket: "pahrikyns-app.firebasestorage.app",
  messagingSenderId: "888703375126",
  appId: "1:888703375126:web:351f6bac4f43c6cfc6e237",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ✅ SAFE messaging init
if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  import("firebase/messaging")
    .then(({ getMessaging }) => {
      messaging = getMessaging(app);
    })
    .catch(() => {
      console.warn("Firebase messaging disabled (no HTTPS)");
    });
}

export { messaging };
