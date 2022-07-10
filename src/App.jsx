import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AllCountries from "./components/AllCountries";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AllCountries />
    </div>
  );
}

export default App;
