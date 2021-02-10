import React from "react";

const SearchResults = (props) => {
  return (
    <div className="list-group">
      {props.results.map((result) => {
        return (
          <div key={result.alpha3Code} className="list-group-item">
            <div className="d-flex w-100 justify-content-between">
              <img
                style={{ width: "36px", height: "auto" }}
                src={result.flag}
                alt={`Flag of ${result.name}`}
              />
              <h5 className="mb-1">{result.name}</h5>
              <small>{result.nativeName}</small>
            </div>
            <p className="mb-1">{result.region}</p>
            <strong>Languages</strong>
            <ul>
              {result.languages.map((lang) => {
                return <li key={lang.iso639_1}>{lang.nativeName}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
