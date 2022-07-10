import React, { useState, useEffect } from "react";
import CountryCard from "./CountryCard";
import "../css/AllCountries.css";

export default function AllCountries() {
  const [allCountries, setAllCountries] = useState([]);
  const [filter, setFilter] = useState({ isIndependent: false });

  const countryCards = allCountries
    .filter((country) => {
      console.log(
        `country.independent: ${country.independent}, ${filter.isIndependent}`
      );
      return country.independent == filter.isIndependent;
    })
    .map((country) => <CountryCard {...country} key={country.cca2} />);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((rest) => rest.json())
      .then((data) => {
        setAllCountries(
          data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        );
      });
  }, []);

  function handleFilter(event) {
    const { name, value, type, checked } = event.target;
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  return (
    <div className="all-countries">
      <h1 className="all-countries--title">All Countries</h1>
      <h2 className="all-countries--count">
        Currently showing {countryCards.length} countries
      </h2>
      <div className="all-countries-filter">
        <label htmlFor="isIndependent">Independent</label>
        <input
          type="checkbox"
          id="isIndependent"
          name="isIndependent"
          onChange={handleFilter}
        ></input>
      </div>
      {countryCards}
    </div>
  );
}
