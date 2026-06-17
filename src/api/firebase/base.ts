import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const API_KEY = import.meta.env.VITE_FIREFASE_TOKEN

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'kinoarea-90de5.firebaseapp.com',
  projectId: 'kinoarea-90de5',
  storageBucket: 'kinoarea-90de5.appspot.com',
  messagingSenderId: '1046909433127',
  appId: '1:1046909433127:web:41bb834b5ca4efc9c76502',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()

export { app, db, auth }
