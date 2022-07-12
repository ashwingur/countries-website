import React from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import FlagQuiz from "./FlagQuiz";

export default function Quiz() {
  return (
    <div className="quiz">
      <h1>Quiz Page</h1>
      <ul>
        <li>
          <Link to="flag_quiz">Flag Quiz</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
