import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/InputQuiz.css";

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
  console.log(
    `Answer for you cheaters is ${remainingCountries[currentCountry].answer}`
  );

  function inputChange(event) {
    var { value } = event.target;
    value = value.toLowerCase();
    var correct = false;
    var answer = remainingCountries[currentCountry].answer;
    if (answer.constructor.name === "Array") {
      if (
        answer
          .map((item) =>
            item
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          )
          .forEach((item) => {
            if (item.toLowerCase() == value.trim()) {
              correct = true;
            }
          })
      ) {
        correct = true;
      }
    } else if (value.trim() == answer.toLowerCase()) {
      correct = true;
    }
    if (correct) {
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
      <h1 className="input-quiz-title">
        {getTitle(useLocation().state.data.type)}
      </h1>
      <div className="input-section">
        <img
          src="https://cdn-icons-png.flaticon.com/512/507/507257.png"
          onClick={gotoPrevFlag}
        />
        <input
          type="text"
          className="quiz-input"
          placeholder="Answer"
          name="country"
          id="country"
          onChange={inputChange}
          value={currentInput}
          autoComplete="off"
          autoFocus
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/271/271226.png"
          onClick={gotoNextFlag}
        />
      </div>

      <p>
        Correctly Guessed: {totalCountries - remainingCountries.length}/
        {totalCountries}
      </p>
      <div className="flag-quiz--main">
        <PromptComponent
          type={useLocation().state.data.type}
          prompt={remainingCountries[currentCountry].prompt}
        />
      </div>
    </div>
  );
}

function getTitle(type) {
  switch (type) {
    case "flag_quiz":
      return "Name the Flag";
    case "capital_quiz":
      return "Name the Capital City";
    case "country_from_capital_quiz":
      return "Name the Country Based on the Capital City";
    default:
      return "Not yet implemented";
  }
}

function PromptComponent(props) {
  const { type, prompt } = props;
  switch (type) {
    case "flag_quiz":
      return <img className="flag-quiz--flag" src={prompt} />;
    case "capital_quiz":
      return <h2 className="input-quiz-prompt">{prompt}</h2>;
    case "country_from_capital_quiz":
      return <h2 className="input-quiz-prompt">{prompt}</h2>;
    default:
      return <p>Not yet implemented</p>;
  }
}
