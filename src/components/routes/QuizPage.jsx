import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../../css/QuizPage.css";

export default function Quiz(props) {
  const [filter, setFilter] = useState({
    region: "Any",
    independent: "Yes",
  });
  const [showFilter, setShowFilter] = useState(true);

  const [quizData, setQuizData] = useState([]);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // This effect navigates to the relevant quiz after a quiz is chosen
    if (url != "") {
      navigate("../" + url, {
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

  function handleFilter(event) {
    const { name, value, type, checked } = event.target;
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function onQuizClick(page, type, conversionFilter) {
    setUrl(page);
    setQuizData({
      type: type,
      countries: conversionFilter(getFilteredCountries()),
    });
    setShowFilter(false);
  }

  return (
    <div className="quiz">
      <h1 className="quiz--title">Quiz Page</h1>

      {showFilter && (
        <div className="quiz-options">
          <ul>
            <li
              onClick={() => {
                onQuizClick("input_quiz", "flag_quiz", flagQuiz);
              }}
            >
              Name the Flag
            </li>
            <li
              onClick={() => {
                onQuizClick("input_quiz", "capital_quiz", capitalQuiz);
              }}
            >
              Name the Capital City
            </li>
            <li
              onClick={() => {
                onQuizClick(
                  "input_quiz",
                  "country_from_capital_quiz",
                  countryFromCapitalQuiz
                );
              }}
            >
              Name the Country from the Capital City
            </li>
            <li
              onClick={() => {
                onQuizClick(
                  "list_quiz",
                  "name_all_countries",
                  nameAllCountriesQuiz
                );
              }}
            >
              Name all the Countries
            </li>
          </ul>
          <h2 className="filters-header">Country Filters</h2>
          <div className="quiz-countries-filter">
            <span className="filter-item">
              <label htmlFor="region" className="filter-label">
                Region{" "}
              </label>
              <select
                className="filter-select"
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
            <span className="filter-item">
              <label htmlFor="independent" className="filter-label">
                Independent{" "}
              </label>
              <select
                className="filter-select"
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
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
}

function flagQuiz(countries) {
  return countries.map((item) => {
    return {
      prompt: item.flags.svg,
      answer: item.name.common,
    };
  });
}

function capitalQuiz(countries) {
  return countries.map((item) => {
    return {
      prompt: item.name.common,
      answer: item.capital,
    };
  });
}

function countryFromCapitalQuiz(countries) {
  return countries.map((item) => {
    return {
      prompt: item.capital,
      answer: item.name.common,
    };
  });
}

function nameAllCountriesQuiz(countries) {
  return countries.map((item) => {
    return {
      prompt: "",
      answer: item.name.common,
    };
  });
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
