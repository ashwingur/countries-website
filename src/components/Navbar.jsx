import React from "react";
import WorldIcon from "../images/world_icon.png";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <img className="nav--logo" src={WorldIcon} />
      <h1 className="nav--title">Countries of the World</h1>
      <ul className="nav--menu">
        <li>
          <Link to="/">Home</Link>{" "}
        </li>
        <li>
          <Link to="/all_countries">All Countries</Link>
        </li>
        <li>
          <Link to="/quiz">Quiz</Link>
        </li>
      </ul>
    </nav>
  );
}
