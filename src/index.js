import React, { useState, createRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./style.css";

function Form(props) {
  const [title, setTitle] = useState("");
  const titleInput = createRef();

  const handleChange = () => {
    setTitle(titleInput.current.value);
  };

  const handleClick = () => {
    props.onClick(title);
    setTitle("");
  };

  return (
    <div id="form-container">
      <label>Title</label>
      <input
        type="text"
        id="title"
        ref={titleInput}
        value={title}
        onChange={handleChange}
      />
      <input type="button" value="Get Advise" onClick={handleClick} />
    </div>
  );
}

function Results(props) {
  const { title, results } = props;

  if (results.length) {
    return (
      <>
        <h2>{title}</h2>
        <div id="results-container">
          {results.map((result, i) => {
            return <Movie key={i} details={result} />;
          })}
        </div>
      </>
    );
  } else {
    return <h2>The results not found</h2>;
  }
}

function Movie(props) {
  const details = props.details;

  return (
    <div className="movie-details">
      <figure>
        <img
          src={details.Poster}
          alt={`The poster of movie ${details.Title}`}
        />
      </figure>
      <div>
        <h3>{details.Title}</h3>
        <h3>{details.Year}</h3>
        <h3>{details.Type}</h3>
        <input type="button" value="Details" />
      </div>
    </div>
  );
}

function App() {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);

  const hanleClick = (title) => {
    setTitle(title);

    let api_key = "ae8ccebb";
    let url = `http://www.omdbapi.com/?apikey=${api_key}&s=${title}`;

    axios.get(url).then((response) => {
      console.log("response :>> ", response);
      setResults(response.data.Search);
    });
  };

  return (
    <>
      <h1>The name of Your App</h1>
      <Form onClick={hanleClick} />
      <Results title={title} results={results} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
