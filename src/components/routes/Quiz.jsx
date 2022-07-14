import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../../css/Quiz.css";

export default function Quiz(props) {
  const [filter, setFilter] = useState({
    region: "Any",
    independent: "Either",
  });
  const [showFilter, setShowFilter] = useState(true);

  const [quizData, setQuizData] = useState([]);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(`Url is ${url}`);
    console.log(`QuizData is ${JSON.stringify(quizData)}`);
    if (url != "") {
      navigate(url, {
        state: {
          data: quizData,
        },
      });
    }
  }, [quizData]);

  function getFilteredCountries() {
    // Set the countries based on the filter
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

    initialCountries = shuffle(initialCountries);

    return initialCountries;
  }

  function convertToFlagQuiz(countries) {
    return countries.map((item) => {
      return {
        prompt: item.flags.svg,
        answer: item.name.common,
      };
    });
  }

  function handleFilter(event) {
    const { name, value, type, checked } = event.target;
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function onQuizClick(page, conversionFilter) {
    setUrl(page);
    setQuizData({
      type: page,
      countries: conversionFilter(getFilteredCountries()),
    });
    setShowFilter(false);
  }

  return (
    <div className="quiz">
      <h1>Quiz Page</h1>
      <ul>
        <li
          onClick={() => {
            onQuizClick("flag_quiz", convertToFlagQuiz);
          }}
        >
          Flag Quiz
        </li>
      </ul>

      {showFilter && (
        <div className="quiz-countries-filter">
          <span>
            <label htmlFor="independent">Independent </label>
            <select
              id="independent"
              value={filter.independent}
              onChange={handleFilter}
              name="independent"
            >
              <option value="Either">Either</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </span>
          <span>
            <label htmlFor="region">Region </label>
            <select
              id="region"
              value={filter.region}
              onChange={handleFilter}
              name="region"
            >
              <option value="Any">Any</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </span>
        </div>
      )}

      <Outlet />
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
