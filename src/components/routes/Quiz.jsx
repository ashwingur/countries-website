import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../css/Quiz.css";

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
