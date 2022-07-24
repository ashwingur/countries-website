import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/ListQuiz.css";

export default function ListQuiz() {
  const navigate = useNavigate();
  console.log(useLocation().state.data);
  const [listBoxes, setListBoxes] = useState(
    useLocation().state.data.countries.map((item) => ({
      ...item,
      answered: false,
    }))
  );
  const [currentInput, setCurrentInput] = useState("");
  const [amountAnswered, setAmountAnswered] = useState(0);
  const [givenUp, setGivenUp] = useState(false);

  const boxes = listBoxes.map((item) => (
    <BoxItem {...item} key={item.answer} givenUp={givenUp} />
  ));

  console.log(listBoxes);

  if (amountAnswered == listBoxes.length) {
    console.log("Completed! Navigating to /quiz");
    navigate("/quiz");
  }

  function inputChange(event) {
    var { value } = event.target;
    value = value.toLowerCase();

    for (var i = 0; i < listBoxes.length; i++) {
      var correct = false;
      const answer = listBoxes[i].answer;
      if (answer.constructor.name === "Array") {
        answer
          .map((item) =>
            item
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(",", "")
              .replace(".", "")
              .replace(".", "")
          )
          .forEach((item) => {
            if (item == value.trim()) {
              correct = true;
            }
          });
      } else if (
        value.trim() ==
        answer
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(",", "")
          .replace(".", "")
          .replace(".", "")
      ) {
        correct = true;
      }
      if (correct && !listBoxes[i].answered) {
        setCurrentInput("");
        setListBoxes((prevState) => {
          var newState = [...prevState];
          newState[i].answered = true;
          return newState;
        });
        setAmountAnswered((prevValue) => prevValue + 1);
        break;
      } else {
        setCurrentInput(value);
      }
    }
  }

  return (
    <div className="list-quiz">
      <h1 className="list-quiz-title">
        {getTitle(useLocation().state.data.type)}
      </h1>
      {!givenUp && (
        <input
          type="text"
          className="quiz-input"
          placeholder="Answer"
          name="answer"
          id="answer"
          onChange={inputChange}
          value={currentInput}
          autoComplete="off"
          autoFocus
        />
      )}
      <p>
        Correctly Answered: {amountAnswered}/{listBoxes.length}
      </p>
      <div className="list-quiz-boxes">{boxes}</div>
      {!givenUp && (
        <button
          className="filter-button list-quiz-giveup"
          onClick={() => {
            setGivenUp(true);
          }}
        >
          Give Up
        </button>
      )}
    </div>
  );
}

function getTitle(type) {
  switch (type) {
    case "name_all_countries":
      return "List all the Countries";
    case "name_all_capitals_with_country":
      return "List All the Capitals given the Country";
    default:
      return "Not yet implemented";
  }
}

function BoxItem(props) {
  const answerClass =
    props.givenUp && !props.answered
      ? "list-quiz-box-answer list-quiz-box-answer-red"
      : "list-quiz-box-answer";
  const answer =
    props.answer.constructor.name === "Array"
      ? props.answer.join(", ")
      : props.answer;
  return (
    <div className="list-quiz-box">
      <span className="list-quiz-box-prompt">{props.prompt}</span>
      <span className={answerClass}>
        {props.answered || props.givenUp ? answer : ""}
      </span>
    </div>
  );
}
