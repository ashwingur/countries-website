import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/FlagQuiz.css";

export default function FlagQuiz(props) {
  const navigate = useNavigate();
  const totalCountries = useLocation().state.data.countries.length;
  const [remainingCountries, setRemainingCountries] = useState([
    ...useLocation().state.data.countries,
  ]);
  const [currentCountry, setCurrentCountry] = useState(
    Math.floor(Math.random() * remainingCountries.length)
  );

  const [currentInput, setCurrentInput] = React.useState("");

  console.log(`Answer is ${remainingCountries[currentCountry].answer}`);

  function inputChange(event) {
    const { value } = event.target;
    if (
      value.trim().toLowerCase() ==
      remainingCountries[currentCountry].answer.toLowerCase()
    ) {
      setCurrentInput("");
      var tempCurrentCountry = currentCountry;
      if (remainingCountries.length == 1) {
        console.log("Navigating to /quiz");
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
    setCurrentInput("");
  }

  function gotoPrevFlag() {
    setCurrentCountry((prevIndex) => {
      if (prevIndex == 0) {
        return remainingCountries.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
    setCurrentInput("");
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
        autoComplete="off"
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
        <PromptComponent
          type={useLocation().state.data.type}
          prompt={remainingCountries[currentCountry].prompt}
        />
        <span className="flag-quiz--right" onClick={gotoNextFlag}>
          →
        </span>
      </div>
    </div>
  );
}

function PromptComponent(props) {
  const { type, prompt } = props;
  switch (type) {
    case "flag_quiz":
      return <img className="flag-quiz--flag" src={prompt} />;
    default:
      return <p>Not yet implemented</p>;
  }
}
