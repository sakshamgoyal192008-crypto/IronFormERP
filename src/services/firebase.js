import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcRGISYOuyHQ7WSdsrfg52loh0tSdq4wM",
  authDomain: "ironformerp.firebaseapp.com",
  projectId: "ironformerp",
  storageBucket: "ironformerp.firebasestorage.app",
  messagingSenderId: "109360164377",
  appId: "1:109360164377:web:ac2f72a2e6ab63fa490488",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);