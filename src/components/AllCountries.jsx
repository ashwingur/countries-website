import React, { useState, useEffect } from "react";
import CountryCard from "./CountryCard";

export default function AllCountries() {
  const [allCountries, setAllCountries] = useState([]);

  const countryCards = allCountries.map((country) => (
    <CountryCard {...country} key={country.cca2} />
  ));

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((rest) => rest.json())
      .then((data) => setAllCountries(data));
  }, []);

  return (
    <div className="all-countries">
      <h1>All Countries</h1>
      {countryCards}
    </div>
  );
}
