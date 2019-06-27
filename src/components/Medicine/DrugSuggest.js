import React, { useState, useContext } from "react";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { DrugContext } from "../../contexts/DrugStore";
import deburr from "lodash/deburr";
import styled from "styled-components";

const StyleWrapper = styled.div`
  & .react-autosuggest__input {
    width: 490px;
    height: 30px;
    border-width: 0;
    border-bottom: 1px solid #dbdbdb;
    margin-right: 0.3rem;
    font-size: 1rem;
  }

  & .react-autosuggest__suggestions-container--open {
    width: 490px;
    margin: 0;
  }

  & .react-autosuggest__suggestions-list {
    width: 100%;
    margin: 10px 0;
    padding: 0;
  }

  & .react-autosuggest__suggestion {
    list-style-type: none;
    font-size: 0.9rem;
    cursor: pointer;
  }

  & .react-autosuggest__suggestion--highlighted {
    background-color: aliceblue;
  }
`;

const DrugSuggest = ({ inputChange }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { drugs } = useContext(DrugContext);

  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = value => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : drugs.filter(drug => {
          const keep =
            count < 7 && drug.item_name.toLowerCase().includes(inputValue);

          if (keep) {
            count += 1;
          }

          return keep;
        });
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = suggestion => {
    return suggestion.item_name;
  };

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion, { query, isHighlited }) => {
    const matches = match(suggestion["item_name"], query);
    const parts = parse(suggestion["item_name"], matches);
    return (
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <b key={index} style={{ color: "red" }}>
              {part.text}
            </b>
          ) : (
            <span key={index}>{part.text}</span>
          )
        )}
      </div>
    );
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    inputChange(newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "약품명 또는 성분명을 입력해주세요",
    value,
    onChange: onChange
  };

  return (
    <StyleWrapper>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        highlightFirstSuggestion={true}
      />
    </StyleWrapper>
  );
};

export default DrugSuggest;
