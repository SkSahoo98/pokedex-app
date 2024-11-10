import React, { useEffect } from "react";
import "./scss/index.scss";
import Navbar from "./Sections/Navbar";
import Footer from "./Sections/Footer";
import Background from "./Components/Background";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Search from "./Pages/Search";
import Compare from "./Pages/Compare";
import Pokemon from "./Pages/Pokemon";
import MyList from "./Pages/MyList";
import About from "./Pages/About";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { clearToast, setUserStatus } from "./app/Slices/AppSlice";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./Utils/FirebaseConfig";
import { current } from "@reduxjs/toolkit";

const App = () => {
  const { toasts } = useAppSelector(({ app }) => app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUserStatus({
            email: currentUser.email,
          })
        );
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (toasts.length) {
      const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      toasts.forEach((message: string) => {
        toast(message, toastOptions);
      });
      dispatch(clearToast());
    }
  }, [toasts, dispatch]);

  return (
    <div className="main-container">
      <Background />
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Routes>
            <Route element={<Search />} path="/search" />
            <Route element={<Compare />} path="/compare" />
            <Route element={<MyList />} path="/list" />
            <Route element={<About />} path="/about" />
            <Route element={<Pokemon />} path="/pokemon/:id" />
            <Route element={<Navigate to="/pokemon/1" />} path="*" />
          </Routes>

          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
