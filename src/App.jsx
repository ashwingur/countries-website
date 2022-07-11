import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AllCountries from "./components/routes/AllCountries";
import { Routes, Route } from "react-router-dom";
import Home from "./components/routes/Home";
import Quiz from "./components/routes/Quiz";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all_countries" element={<AllCountries />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  );
}

export default App;
