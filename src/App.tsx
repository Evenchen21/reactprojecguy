/* eslint-disable react/jsx-no-undef */
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
