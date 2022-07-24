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
  const prompt = countries[currentIndex].prompt;

  function multipleChoiceClick(index) {
    console.log(`Current index is ${currentIndex}`);
    if (index === currentIndex) {
      console.log("Correct");
      setCorrectCount((prevCount) => prevCount + 1);
    } else {
      console.log("Incorrect");
    }
    if (currentIndex == countries.length - 1) {
      setFinished(true);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }

  return (
    <div className="multiple-choice-quiz">
      <h1>{getTitle(type)}</h1>
      <p>
        Correctly Answered: {correctCount}/{countries.length}
      </p>
      <PromptComponent prompt={prompt} type={type} />
      <AnswerComponent
        countries={countries}
        currentIndex={currentIndex}
        type={type}
        clickEvent={multipleChoiceClick}
      />
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
    default:
      return <p className="multiple-choice-prompt">Not yet implemented</p>;
  }
}

function AnswerComponent(props) {
  const { countries, currentIndex, type, clickEvent } = props;
  const multiple_choice_options = getRandomIndexes(
    currentIndex,
    countries.length
  );

  return (
    <div className="multiple-choice--answer_component">
      {multiple_choice_options.map((item) => {
        switch (type) {
          case "pick_capital_city_from_country":
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
      return "Pick the Capital City from the Country";

    default:
      return "Not yet implemented";
  }
}
