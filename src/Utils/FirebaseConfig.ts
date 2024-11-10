import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcTGq-xtwKfKPqlpzsduR99oX_OpGMEU0",
  authDomain: "pokedex-69.firebaseapp.com",
  projectId: "pokedex-69",
  storageBucket: "pokedex-69.appspot.com",
  messagingSenderId: "518931347962",
  appId: "1:518931347962:web:e3e47ee44d8ae0fc74cc43",
  measurementId: "G-L0XB3KHPV1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const userRef = collection(firebaseDB, "users");
export const pokemonListRef = collection(firebaseDB, "pokemonList");
