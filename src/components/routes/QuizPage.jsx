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

  function QuizItem(props) {
    const { text, page, type, conversionFilter } = props;
    return (
      <li
        onClick={() => {
          onQuizClick(page, type, conversionFilter);
        }}
      >
        {text}
      </li>
    );
  }

  return (
    <div className="quiz">
      <h1 className="quiz--title">Quizzes</h1>

      {showFilter && (
        <div className="quiz-options">
          <ul>
            <QuizItem
              text="Name the Flag"
              page="input_quiz"
              type="flag_quiz"
              conversionFilter={flagQuiz}
            />
            <QuizItem
              text="Name the Capital City"
              page="input_quiz"
              type="capital_quiz"
              conversionFilter={capitalQuiz}
            />
            <QuizItem
              text="Name the Country from the Capital City"
              page="input_quiz"
              type="country_from_capital_quiz"
              conversionFilter={countryFromCapitalQuiz}
            />
            <QuizItem
              text="Name all the Countries"
              page="list_quiz"
              type="name_all_countries"
              conversionFilter={nameAllCountriesQuiz}
            />
            <QuizItem
              text="Name all the Capitals with Country Listed"
              page="list_quiz"
              type="name_all_capitals_with_country"
              conversionFilter={nameAllCapitalsWithCountry}
            />
            <QuizItem
              text="Pick the Correct Capital City Given the Country"
              page="multiple_choice_quiz"
              type="pick_capital_city_from_country"
              conversionFilter={pickCapitalCityFromCountry}
            />
            <QuizItem
              text="Pick the Correct Country Given the Capital City"
              page="multiple_choice_quiz"
              type="pick_country_from_capital_city"
              conversionFilter={pickCountryFromCapitalCity}
            />
            <QuizItem
              text="Pick the Correct Flag Given the Country"
              page="multiple_choice_quiz"
              type="pick_flag_from_country"
              conversionFilter={pickFlagFromCountry}
            />
            <QuizItem
              text="Pick the Country Given the Flag"
              page="multiple_choice_quiz"
              type="pick_country_from_flag"
              conversionFilter={pickCountryFromFlag}
            />
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

function nameAllCapitalsWithCountry(countries) {
  return countries.map((item) => {
    return {
      prompt: item.name.common,
      answer: item.capital,
    };
  });
}

function pickCapitalCityFromCountry(countries) {
  return countries.map((item) => {
    return {
      prompt: item.name.common,
      answer: item.capital,
    };
  });
}

function pickCountryFromCapitalCity(countries) {
  return countries.map((item) => {
    return {
      prompt: item.capital,
      answer: item.name.common,
    };
  });
}

function pickFlagFromCountry(countries) {
  return countries.map((item) => {
    return {
      prompt: item.name.common,
      answer: item.flags.svg,
    };
  });
}

function pickCountryFromFlag(countries) {
  return countries.map((item) => {
    return {
      prompt: item.flags.svg,
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
