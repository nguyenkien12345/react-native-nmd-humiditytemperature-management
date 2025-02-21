// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from 'firebase/app'
import { getReactNativePersistence, initializeAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyDpmfxFPTl25a--cgYxdA-R2dCXMbgIRpE',
  authDomain: 'mobile-authentication-89726.firebaseapp.com',
  projectId: 'mobile-authentication-89726',
  storageBucket: 'mobile-authentication-89726.firebasestorage.app',
  messagingSenderId: '973394127587',
  appId: '1:973394127587:web:170f0d318ef0a5d11873d6'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Thiết lập hệ thống xác thực của Firebase (Firebase Authentication).
// getReactNativePersistence cho phép sử dụng AsyncStorage như một phương thức lưu trữ cho xác thực.
// Duy trì trạng thái đăng nhập của người dùng giữa các phiên làm việc.
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

const database = getFirestore()

export { auth, database }
