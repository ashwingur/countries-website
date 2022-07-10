import React from "react";
import "../css/CountryCard.css";

export default function CountryCard(props) {
  return (
    <div className="country-card">
      <h2 className="country-card--name">{props.name.common}</h2>
      <div className="country-card--content">
        <img className="country-card--flag" src={props.flags.svg} />
        <div className="country-card--facts">
          <p className="country-card--capitals">Capitals: {props.capital}</p>
          <p className="country-card--region">Region: {props.region}</p>
        </div>
      </div>
    </div>
  );
}
