import { initializeApp } from "@firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { getDatabase } from "@firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwSApIGLNw4jM0a4IUv59rjqVG_YB-I7U",
  authDomain: "khaouitiblogs.firebaseapp.com",
  projectId: "khaouitiblogs",
  storageBucket: "khaouitiblogs.appspot.com",
  messagingSenderId: "975892898893",
  appId: "1:975892898893:web:c3c6d5c479227975faa804",
  measurementId: "G-MBTLK6R557"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export const db = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
