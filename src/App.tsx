/* eslint-disable react/jsx-no-undef */
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./components/About";
import Favorite from "./components/Favorite";
import MyCards from "./components/MyCards";
import Admin from "./components/Admin";

// Route the different pages in the Code // PLEASE KEEP THIS DO NOT DELETE //

function App() {
  return (
    // Main Application Component with Routing and Toast Notifications //
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* // Application Routes // */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/myCards" element={<MyCards />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
