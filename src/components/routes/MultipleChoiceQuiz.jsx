import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/MultipleChoiceQuiz.css";

export default function MultipleChoiceQuiz() {
  const navigate = useNavigate();
  const type = useLocation().state.data.type;
  const countries = useLocation().state.data.countries;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [randomIndexes, setRandomIndexes] = useState(
    getRandomIndexes(currentIndex, countries.length)
  );

  const [correctText, setCorrectText] = useState("");
  const [correctTextStyle, setCorrectTextStyle] = useState(
    "multiple-choice-invisible"
  );

  const prompt = countries[currentIndex].prompt;

  function multipleChoiceClick(index) {
    console.log(`Current index is ${currentIndex}`);
    if (index === currentIndex) {
      setCorrectText("Corrrect");
      setCorrectTextStyle("multiple-choice-correct");
      setCorrectCount((prevValue) => prevValue + 1);
    } else {
      console.log("Incorrect");
      setCorrectText("Incorrect");
      setCorrectTextStyle("multiple-choice-incorrect");
    }
    if (currentIndex == countries.length - 1) {
      setFinished(true);
    } else {
      setRandomIndexes(getRandomIndexes(currentIndex + 1, countries.length));
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
    setTimeout(() => {
      setCorrectTextStyle("multiple-choice-invisible");
      setCorrectText("");
    }, 1000);
  }

  return (
    <div className="multiple-choice-quiz">
      <h1>{getTitle(type)}</h1>
      <p>
        Correctly Answered: {correctCount}/{countries.length}
      </p>
      {!finished && (
        <div>
          <PromptComponent prompt={prompt} type={type} />
          <AnswerComponent
            countries={countries}
            currentIndex={currentIndex}
            type={type}
            multiple_choice_options={randomIndexes}
            clickEvent={multipleChoiceClick}
          />
        </div>
      )}
      <p className={correctTextStyle}>{correctText}</p>
      {finished && (
        <button className="filter-button" onClick={() => navigate("/quiz")}>
          Back
        </button>
      )}
    </div>
  );
}

function PromptComponent(props) {
  const { type, prompt } = props;
  switch (type) {
    case "pick_capital_city_from_country":
      return (
        <p className="multiple-choice-prompt">
          What is the capital of {prompt}?
        </p>
      );
    case "pick_country_from_capital_city":
      return (
        <p className="multiple-choice-prompt">
          What Country has the Capital City {prompt}?
        </p>
      );
    default:
      return <p className="multiple-choice-prompt">Not yet implemented</p>;
  }
}

function AnswerComponent(props) {
  const { countries, currentIndex, type, clickEvent, multiple_choice_options } =
    props;

  return (
    <div className="multiple-choice--answer_component">
      {multiple_choice_options.map((item) => {
        switch (type) {
          case ("pick_capital_city_from_country",
          "pick_country_from_capital_city"):
            return (
              <p
                className="multiple-choice--answer_item"
                onClick={() => clickEvent(item)}
                key={item}
              >
                {countries[item].answer}
              </p>
            );
        }
      })}
    </div>
  );
}

function getRandomIndexes(answerIndex, arrayLength) {
  const indexes = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * arrayLength);
    if (randomIndex == answerIndex || indexes.includes(randomIndex)) {
      i--;
    } else {
      indexes.push(randomIndex);
    }
  }
  indexes.splice(Math.floor(Math.random() * 4), 0, answerIndex);
  return indexes;
}

function getTitle(type) {
  switch (type) {
    case "pick_capital_city_from_country":
      return "Pick the Capital City Given the Country";
    case "pick_country_from_capital_city":
      return "Pick the Country Given the Capital City";

    default:
      return "Not yet implemented";
  }
}
