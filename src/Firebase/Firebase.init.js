// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkuVsHjkk3bc3xy5MHxjrJEr042alEPzg",
  authDomain: "arclane.firebaseapp.com",
  projectId: "arclane",
  storageBucket: "arclane.firebasestorage.app",
  messagingSenderId: "338730673672",
  appId: "1:338730673672:web:8610b3c6e973049df3d3bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
