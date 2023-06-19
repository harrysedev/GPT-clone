import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBJLDodJDZbOmB52Uz5C50bS9NMw-XGaY",
  authDomain: "chatgpt-clone-4e441.firebaseapp.com",
  projectId: "chatgpt-clone-4e441",
  storageBucket: "chatgpt-clone-4e441.appspot.com",
  messagingSenderId: "326158573317",
  appId: "1:326158573317:web:2ae786a8627205aab3216c"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }