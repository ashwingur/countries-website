import React, { useState } from "react";
import "../../css/FlagQuiz.css";

export default function FlagQuiz(props) {
  const [remainingCountries, setRemainingCountries] = useState([
    ...props.allCountries,
  ]);
  const [currentCountry, setCurrentCountry] = useState(
    Math.floor(Math.random() * remainingCountries.length)
  );

  console.log(
    `Current Country is ${remainingCountries[currentCountry].name.common}`
  );

  function gotoNextFlag() {
    setCurrentCountry((prevIndex) => {
      if (prevIndex == remainingCountries.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  }

  function gotoPrevFlag() {
    setCurrentCountry((prevIndex) => {
      if (prevIndex == 0) {
        return remainingCountries.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  }

  return (
    <div className="flag-quiz">
      <input className="quiz-input" placeholder="Country"></input>
      <h3>Correctly Guessed: 10/250</h3>
      <div className="flag-quiz--main">
        <span className="flag-quiz--back" onClick={gotoPrevFlag}>
          ←
        </span>
        <img
          className="flag-quiz--flag"
          src={remainingCountries[currentCountry].flags.svg}
        />
        <span className="flag-quiz--right" onClick={gotoNextFlag}>
          →
        </span>
      </div>
    </div>
  );
}
