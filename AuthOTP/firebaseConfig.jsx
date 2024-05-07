
// Initialize Firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from '@react-native-firebase/app';

// Your React Native app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxwNXlGIdVQcsp6j3LlrarxuVMLe_3ORk",
  authDomain: "otpauthapp-5fb23.firebaseapp.com",
  projectId: "otpauthapp-5fb23",
  storageBucket: "otpauthapp-5fb23.appspot.com",
  messagingSenderId: "982166152098",
  appId: "1:982166152098:web:48416ffee27df7c38bc8fb",
  measurementId: "G-F2E1YQ2EYQ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
