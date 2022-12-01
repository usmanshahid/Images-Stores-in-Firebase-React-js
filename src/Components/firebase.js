import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDENJ4sNBYXG9EYVNwbFBOYmLW-FUdwnVs",
  authDomain: "imageuploadagain.firebaseapp.com",
  projectId: "imageuploadagain",
  storageBucket: "imageuploadagain.appspot.com",
  messagingSenderId: "660655083373",
  appId: "1:660655083373:web:f6f8899b9538921f629464"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storagefirebase = getStorage(app);