import React, { useEffect, useState } from "react";
import "../../css/FlagQuiz.css";

export default function FlagQuiz(props) {
  const [totalCountries, setTotalCountries] = useState(0);
  useEffect(() => {
    setTotalCountries(
      props.allCountries.filter((country) => {
        return country.independent == true;
      }).length
    );
  }, []);

  const [remainingCountries, setRemainingCountries] = useState(
    props.allCountries.filter((country) => {
      return country.independent == true;
    })
  );
  const [currentCountry, setCurrentCountry] = useState(
    Math.floor(Math.random() * remainingCountries.length)
  );
  const [currentInput, setCurrentInput] = React.useState("");

  console.log(
    `Current Country is ${remainingCountries[currentCountry].name.common}`
  );

  function inputChange(event) {
    const { value } = event.target;
    if (
      value.trim().toLowerCase() ==
      remainingCountries[currentCountry].name.common.toLowerCase()
    ) {
      setCurrentInput("");
      setRemainingCountries((prevState) => {
        var newState = [...prevState];
        newState.splice(currentCountry, 1);
        return newState;
      });
      if (currentCountry >= remainingCountries.length) {
        setCurrentCountry(0);
      }
    } else {
      setCurrentInput(value);
    }
  }

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
      <input
        type="text"
        className="quiz-input"
        placeholder="Country"
        name="country"
        id="country"
        onChange={inputChange}
        value={currentInput}
        autoFocus
      ></input>
      <h3>
        Correctly Guessed: {totalCountries - remainingCountries.length}/
        {totalCountries}
      </h3>
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
