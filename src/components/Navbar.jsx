import React from "react";
import WorldIcon from "../images/world_icon.png";
import "../css/Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <img className="nav--logo" src={WorldIcon} />
      <h1 className="nav--title">Countries of the World</h1>
    </nav>
  );
}
