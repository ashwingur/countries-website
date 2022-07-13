import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../../css/Quiz.css";

export default function Quiz() {
  const [filter, setFilter] = useState({
    region: "Any",
    independent: "Either",
  });

  function handleFilter(event) {
    const { name, value, type, checked } = event.target;
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  console.log(JSON.stringify(filter));

  return (
    <div className="quiz">
      <h1>Quiz Page</h1>
      <ul>
        <li>
          <Link to="flag_quiz" state={filter}>
            Flag Quiz
          </Link>
        </li>
      </ul>

      <div className="quiz-countries-filter">
        <span>
          <label htmlFor="independent">Independent </label>
          <select
            id="independent"
            value={filter.independent}
            onChange={handleFilter}
            name="independent"
          >
            <option value="Either">Either</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </span>
        <span>
          <label htmlFor="region">Region </label>
          <select
            id="region"
            value={filter.region}
            onChange={handleFilter}
            name="region"
          >
            <option value="Any">Any</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </span>
      </div>

      <Outlet />
    </div>
  );
}
