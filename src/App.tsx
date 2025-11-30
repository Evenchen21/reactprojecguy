/* eslint-disable react/jsx-no-undef */
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";

// Route the different pages in the Code //PLEASE KEEP THIS DO NOT DELETE//
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
