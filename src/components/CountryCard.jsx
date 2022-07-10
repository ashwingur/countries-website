import React, { useState } from "react";
import "../css/CountryCard.css";

export default function CountryCard(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  function mouseEnterCard() {
    setIsExpanded(true);
  }
  function mouseLeaveCard() {
    setIsExpanded(false);
  }

  let languages = [];
  for (var key in props.languages) {
    languages.push(props.languages[key]);
  }

  let currencies = [];
  for (var key in props.currencies) {
    currencies.push(`${props.currencies[key].name} (${key})`);
  }

  return (
    <div
      className="country-card"
      onMouseEnter={mouseEnterCard}
      onMouseLeave={mouseLeaveCard}
    >
      <h2 className="country-card--name">{props.name.common}</h2>
      <div className="country-card--content">
        <img className="country-card--flag" src={props.flags.svg} />
        <div className="country-card--facts">
          <p className="country-card--capitals">
            <span className="country-card--fact_title">Capital:</span>{" "}
            {props.capital}
          </p>
          <p className="country-card--region">
            <span className="country-card--fact_title">Region:</span>{" "}
            {props.region}
          </p>
          <p className="country-card--region">
            <span className="country-card--fact_title">Languages:</span>{" "}
            {languages.join(", ")}
          </p>
          <p className="country-card--region">
            <span className="country-card--fact_title">Population:</span>{" "}
            {props.population.toLocaleString()}
          </p>
          {isExpanded && (
            <div>
              <p className="country-card--official_name">
                <span className="country-card--fact_title">Official Name:</span>{" "}
                {props.name.official}
              </p>
              <p className="country-card--currencies">
                <span className="country-card--fact_title">Currencies:</span>{" "}
                {currencies.join(", ")}
              </p>
              <p className="country-card--independent">
                <span className="country-card--fact_title">Independent:</span>{" "}
                {props.independent ? "Yes" : "No"}
              </p>
              <p className="country-card--un_member">
                <span className="country-card--fact_title">UN Member:</span>{" "}
                {props.unMember ? "Yes" : "No"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
