import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    // ...
    storageBucket: 'gs://enyugma-c1ff0.appspot.com'
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);