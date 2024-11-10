import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { firebaseAuth, firebaseDB, userRef } from "../Utils/FirebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { setUserStatus } from "../app/Slices/AppSlice";
import { useAppDispatch } from "../app/hooks";

function Login() {
    const dispatch = useAppDispatch();
  
    const handleLogin = async () => {
      const provider = new GoogleAuthProvider();
      const {
        user: { email, uid },
      } = await signInWithPopup(firebaseAuth, provider);
  
      if (email) {
        const firestoreQuery = query(userRef, where("uid", "==", uid));
        const fetchedUser = await getDocs(firestoreQuery);
        if (fetchedUser.docs.length === 0) {
          await addDoc(collection(firebaseDB, "users"), {
            uid,
            email,
          });
        }
        dispatch(setUserStatus({ email }));
      }
    };
  
    return (
      <div className="login">
        <button onClick={handleLogin} className="login-btn">
          <FcGoogle /> Login with Google
        </button>
      </div>
    );
  }

export default Login;

