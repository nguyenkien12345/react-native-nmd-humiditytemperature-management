// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDpmfxFPTl25a--cgYxdA-R2dCXMbgIRpE',
  authDomain: 'mobile-authentication-89726.firebaseapp.com',
  projectId: 'mobile-authentication-89726',
  storageBucket: 'mobile-authentication-89726.firebasestorage.app',
  messagingSenderId: '973394127587',
  appId: '1:973394127587:web:170f0d318ef0a5d11873d6'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth()

export { auth }
