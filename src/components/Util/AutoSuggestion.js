import React, { useState, useContext } from "react";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { DrugContext } from "../../contexts/DrugStore";
import deburr from "lodash/deburr";
import styled from "styled-components";
import { breakpoints } from "../UI/SharedStyles";

const StyleWrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  position: relative;

  @media (max-width: ${breakpoints}) {
    width: 100%;
  }
  & .react-autosuggest__input {
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    border-width: 0;
    border-bottom: 1px solid #dbdbdb;
    font-size: 1rem;
    @media (max-width: ${breakpoints}) {
      width: 100%;
    }
  }

  & .react-autosuggest__suggestions-container--open {
    margin: 0;
    position: absolute;
    left: 0;
    top: 29px;
    background-color: white;
    border: 1px solid #dbdbdb;
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

const AutoSuggestion = ({
  search,
  searchKey,
  placeholderProp,
  inputChange
}) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { state } = useContext(DrugContext);
  const { drugs, adverse_effects } = state;

  let suggestList;
  switch (search) {
    case "drug":
      suggestList = drugs;
      break;
    case "adverse_effect":
      suggestList = adverse_effects;
      break;
    default:
      break;
  }

  const getSuggestions = value => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : suggestList.filter(suggestion => {
          const keep =
            count < 7 &&
            suggestion[searchKey].toLowerCase().includes(inputValue);

          if (keep) {
            count += 1;
          }

          return keep;
        });
  };

  const getSuggestionValue = suggestion => {
    return suggestion[searchKey];
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    if (search === "adverse_effect") inputChange(suggestion);
  };

  const renderSuggestion = (suggestion, { query, isHighlited }) => {
    const matches = match(suggestion[searchKey], query);
    const parts = parse(suggestion[searchKey], matches);
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
    if (search === "drug") {
      inputChange(newValue);
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: placeholderProp,
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
        onSuggestionSelected={onSuggestionSelected}
      />
    </StyleWrapper>
  );
};

export default AutoSuggestion;
