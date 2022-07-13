import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/FlagQuiz.css";

export default function FlagQuiz(props) {
  const navigate = useNavigate();
  const [totalCountries, setTotalCountries] = useState(0);

  function setInitialCountries() {
    const location = useLocation();
    const filter = location.state;

    var initialCountries = props.allCountries
      .filter((country) => {
        if (filter.independent == "Either") {
          return true;
        } else if (filter.independent == "Yes") {
          return country.independent;
        } else {
          return !country.independent;
        }
      })
      .filter(
        (country) => country.region == filter.region || filter.region == "Any"
      );

    useEffect(() => {
      setTotalCountries(initialCountries.length);
    }, []);

    initialCountries = shuffle(initialCountries);

    return initialCountries;
  }

  const [remainingCountries, setRemainingCountries] = useState(
    setInitialCountries()
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
      var tempCurrentCountry = currentCountry;
      if (remainingCountries.length == 1) {
        navigate("/quiz");
      } else if (currentCountry == remainingCountries.length - 1) {
        setCurrentCountry(0);
      }

      setRemainingCountries((prevState) => {
        var newState = [...prevState];
        newState.splice(tempCurrentCountry, 1);
        return newState;
      });
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

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
