import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AllCountries from "./components/routes/AllCountries";
import { Routes, Route } from "react-router-dom";
import Home from "./components/routes/Home";
import Quiz from "./components/routes/QuizPage";
import FlagQuiz from "./components/routes/InputQuiz";

function App() {
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((rest) => rest.json())
      .then((data) => {
        setAllCountries(
          data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        );
      });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/all_countries"
          element={<AllCountries allCountries={allCountries} />}
        />
        <Route path="/quiz" element={<Quiz allCountries={allCountries} />}>
          <Route
            path="input_quiz"
            element={<FlagQuiz allCountries={allCountries} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
