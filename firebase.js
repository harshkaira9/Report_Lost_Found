import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCmFBm5w3CNTH5pXt4xo-fVnan7RMbXUPM",
  authDomain: "itemfinder-239d4.firebaseapp.com",
  projectId: "itemfinder-239d4",
  storageBucket: "itemfinder-239d4.appspot.com",
  messagingSenderId: "599376617670",
  appId: "1:599376617670:web:9f34b49770bf152571b7c7",
  measurementId: "G-GE1MZ3C3MF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
