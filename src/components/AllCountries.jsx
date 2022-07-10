import React, { useState, useEffect } from "react";
import CountryCard from "./CountryCard";
import "../css/AllCountries.css";

export default function AllCountries() {
  const [allCountries, setAllCountries] = useState([]);
  const [filter, setFilter] = useState({
    filtersEnabled: false,
    region: "Any",
    independent: "Either",
  });

  let countryCards;

  if (!filter.filtersEnabled) {
    countryCards = allCountries.map((country) => (
      <CountryCard {...country} key={country.cca2} />
    ));
  } else {
    countryCards = allCountries
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
      .map((country) => <CountryCard {...country} key={country.cca2} />);
  }

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
        <span className="all-countries-filter_item">
          <label htmlFor="filtersEnabled">Enable Filters</label>
          <input
            type="checkbox"
            id="filtersEnabled"
            name="filtersEnabled"
            onChange={handleFilter}
            value={filter.filtersEnabled}
          />
        </span>
        <span className="all-countries-filter_item">
          <label htmlFor="independent">Independent</label>
          <select
            id="independent"
            //   value={filter.region}
            onChange={handleFilter}
            name="independent"
            disabled={!filter.filtersEnabled}
          >
            <option value="Either">Either</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </span>
        <span className="all-countries-filter_item">
          <label htmlFor="region">Region</label>
          <select
            id="region"
            //   value={filter.region}
            onChange={handleFilter}
            name="region"
            disabled={!filter.filtersEnabled}
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
      {countryCards}
    </div>
  );
}
