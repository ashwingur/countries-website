import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/ListQuiz.css";

/*Pass in quiz data as a list

quizData = [{prompt: "", "Answer: "Australia", answered: false}]

*/
export default function ListQuiz() {
  const navigate = useNavigate();
  console.log(useLocation().state.data);
  const [listBoxes, setListBoxes] = useState(
    useLocation().state.data.countries.map((item) => ({
      ...item,
      answered: false,
    }))
  );
  const [currentInput, setCurrentInput] = React.useState("");

  const boxes = listBoxes.map((item) => (
    <BoxItem {...item} key={item.answer} />
  ));

  console.log(listBoxes);

  var completed = true;
  listBoxes.forEach((item) => (completed &= item.answered));
  if (completed) {
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
      <div className="list-quiz-boxes">{boxes}</div>
    </div>
  );
}

function getTitle(type) {
  switch (type) {
    case "name_all_countries":
      return "Name all the Countries";
    default:
      return "Not yet implemented";
  }
}

function BoxItem(props) {
  return (
    <div className="list-quiz-box">
      <span>{props.prompt}</span>
      <span className="list-quiz-box-answer">
        {props.answered ? props.answer : ""}
      </span>
    </div>
  );
}
