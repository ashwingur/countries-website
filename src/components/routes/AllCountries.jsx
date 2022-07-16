import React, { useState, useEffect } from "react";
import CountryCard from "../CountryCard";
import "../../css/AllCountries.css";

export default function AllCountries(props) {
  const [filter, setFilter] = useState({
    region: "Any",
    independent: "Either",
    searchCountry: "",
  });

  const countryCards = props.allCountries
    .filter((country) => {
      if (filter.independent == "Either") {
        return true;
      } else if (filter.independent == "Yes") {
        return country.independent;
      } else {
        return !country.independent;
      }
    })
    .filter((country) => {
      return country.region == filter.region || filter.region == "Any";
    })
    .filter((country) => {
      if (
        filter.searchCountry == "" ||
        country.name.common
          .toLowerCase()
          .includes(filter.searchCountry.toLowerCase()) ||
        country.name.official
          .toLowerCase()
          .includes(filter.searchCountry.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    })
    .map((country) => <CountryCard {...country} key={country.cca2} />);

  function handleFilter(event) {
    const { name, value, type, checked } = event.target;
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function resetFilter(event) {
    setFilter({
      region: "Any",
      independent: "Either",
      searchCountry: "",
    });
  }

  return (
    <div className="all-countries">
      <h1 className="all-countries--title">All Countries</h1>
      <h2 className="all-countries--count">
        Currently showing {countryCards.length} countries
      </h2>

      <div className="all-countries-filter">
        <span className="filter-item">
          <label className="filter-label" htmlFor="independent">
            {" "}
          </label>
          <button className="filter-button" onClick={resetFilter}>
            Reset Filters
          </button>
        </span>

        <span className="filter-item">
          <label className="filter-label" htmlFor="independent">
            Independent{" "}
          </label>
          <select
            className="filter-select"
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
        <span className="filter-item">
          <label className="filter-label" htmlFor="region">
            Region{" "}
          </label>
          <select
            className="filter-select"
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
        <span className="filter-item">
          <label className="filter-label" htmlFor="searchCountry">
            Search For Country{" "}
          </label>
          <input
            className="filter-input"
            id="searchCountry"
            name="searchCountry"
            onChange={handleFilter}
            value={filter.searchCountry}
            placeholder="Country Name"
          />
        </span>
      </div>
      {countryCards}
    </div>
  );
}
