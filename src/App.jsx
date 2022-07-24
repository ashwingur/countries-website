import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AllCountries from "./components/routes/AllCountries";
import { Routes, Route } from "react-router-dom";
import Home from "./components/routes/Home";
import Quiz from "./components/routes/QuizPage";
import InputQuiz from "./components/routes/InputQuiz";
import ListQuiz from "./components/routes/ListQuiz";
import MultipleChoiceQuiz from "./components/routes/MultipleChoiceQuiz";

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
        <Route path="/quiz" element={<Quiz allCountries={allCountries} />} />
        <Route path="input_quiz" element={<InputQuiz />} />
        <Route path="list_quiz" element={<ListQuiz />} />
        <Route path="multiple_choice_quiz" element={<MultipleChoiceQuiz />} />
      </Routes>
    </div>
  );
}

export default App;
