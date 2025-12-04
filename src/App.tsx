/* eslint-disable react/jsx-no-undef */
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Cart from "./components/Card";

// Route the different pages in the Code // PLEASE KEEP THIS DO NOT DELETE //

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
