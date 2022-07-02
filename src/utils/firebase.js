// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
 
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXhCzDe2fKxWHBO87ztZtWeqXYWPq57cE",
  authDomain: "birtday-898dc.firebaseapp.com",
  databaseURL: "https://birtday-898dc-default-rtdb.firebaseio.com",
  projectId: "birtday-898dc",
  storageBucket: "birtday-898dc.appspot.com",
  messagingSenderId: "923831465096",
  appId: "1:923831465096:web:1e70c87a1495c6507b5b3d"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
