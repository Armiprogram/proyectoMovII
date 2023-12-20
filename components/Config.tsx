
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { initializeAuth,  getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyB4VLxaCWc7RgDi_pUDNMTcadIWOazFQSo",
  authDomain: "proyecto-final-6cdb6.firebaseapp.com",
  databaseURL: "https://proyecto-final-6cdb6-default-rtdb.firebaseio.com",
  projectId: "proyecto-final-6cdb6",
  storageBucket: "proyecto-final-6cdb6.appspot.com",
  messagingSenderId: "998139689956",
  appId: "1:998139689956:web:360839050d2de3edf5a5f1"
};


const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
export const storage = getStorage(app)
