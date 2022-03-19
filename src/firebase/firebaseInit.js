import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getStorage } from "firebase/storage";
import "firebase/firestore";
import {
  initializeAuth,
  indexedDBLocalPersistence,
  getAuth,
} from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzm5xiuCl6cEF18lL6GKvDcHraN-Vcnis",
  authDomain: "mona-daily-art.firebaseapp.com",
  projectId: "mona-daily-art",
  storageBucket: "mona-daily-art.appspot.com",
  messagingSenderId: "845182368400",
  appId: "1:845182368400:web:8fbcd41a067d4d484d3615",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize auth
export const auth = getAuth(app);
// Create database reference
export const database = getDatabase(app);
// Reference to posts in Realtime DB
// Get reference to specific user using user id
export function getUserRef(userId) {
  return ref(database, "users/" + userId);
}

// Reference to the storage service
export const storage = getStorage(app);

const db = getFirestore(app);
export const collectionsRef = collection(db, "collections");
export const usersRef = collection(db, "users");
export const artpiecesRef = collection(db, "artpieces");
export const artInCollectionsRef = collection(db, "artpieces_in_collections");
