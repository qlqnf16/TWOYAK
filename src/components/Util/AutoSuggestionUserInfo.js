import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import deburr from "lodash/deburr";
import styled from "styled-components";
import { breakpoints } from "../UI/SharedStyles";
import { ReactComponent as Erase } from "../../assets/images/erase.svg";
import addIcon from "../../assets/images/add.svg";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StyleWrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  position: relative;

  @media (max-width: ${breakpoints}) {
    width: 100%;
  }
`;

const AutoSuggestion = ({
  search,
  searchKey,
  placeholderProp,
  diseaseSearchTerms,
  appendDiseaseId
}) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  let suggestList;
  switch (search) {
    case "standard_diseases":
      suggestList = diseaseSearchTerms.standard_diseases;
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
            count < 20 &&
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
    if (search === "standard_diseases") appendDiseaseId(suggestion);
  };

  const renderSuggestion = (suggestion, { query, isHighlited }) => {
    const matches = match(suggestion[searchKey], query);
    const parts = parse(suggestion[searchKey], matches);
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* <div
          onClick={() => {
            console.log(suggestion.id);
          }}
        >
          {suggestion.id}
        </div> */}
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
        <img
          src={addIcon}
          alt="add-icon"
          onClick={() => appendDiseaseId(suggestion)}
        />
      </div>
    );
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
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
    <Container>
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
      {value && (
        <Erase
          onClick={() => {
            setValue("");
          }}
        />
      )}
    </Container>
  );
};

export default AutoSuggestion;
