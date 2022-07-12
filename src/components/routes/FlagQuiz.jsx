import React, { useState } from "react";
import "../../css/FlagQuiz.css";

const flagHolder =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1200px-Flag_of_Australia_%28converted%29.svg.png";

export default function FlagQuiz() {
  const [remainingCountries, setRemainingCountries] = useState();
  const [currentCountry, setCurrentCountry] = useState();

  return (
    <div className="flag-quiz">
      <input className="quiz-input" placeholder="Country"></input>
      <h3>Correctly Guessed: 10/250</h3>
      <div className="flag-quiz--main">
        <span className="flag-quiz--back">←</span>
        <img className="flag-quiz--flag" src={flagHolder} />
        <span className="flag-quiz--right">→</span>
      </div>
    </div>
  );
}
