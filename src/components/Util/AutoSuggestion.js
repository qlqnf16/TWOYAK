import React, { useState, useContext } from "react";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { DrugContext } from "../../contexts/DrugStore";
import deburr from "lodash/deburr";
import styled from "styled-components";
import { breakpoints, BasicText } from "../UI/SharedStyles";
import { ReactComponent as Erase } from "../../assets/images/erase.svg";
import { ReactComponent as Add } from "../../assets/images/plus-in-search.svg";
import axios from '../../apis'

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

const RecommendContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemContainer = styled.div`
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AutoSuggestion = ({
  search,
  searchKey,
  placeholderProp,
  addCurrentDrug,
  currentDrugs,
  inputChange,
  inputAdd,
  submit
}) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { state } = useContext(DrugContext);
  const { drugs, adverse_effects, diseases } = state;

  let suggestList;
  switch (search) {
    case "drug":
      suggestList = drugs;
      break;
    case "adverse_effect":
      suggestList = adverse_effects;
      break;
    case "disease":
      suggestList = diseases;
    default:
      break;
  }

  const getSuggestions = value => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    const suggestionList = suggestList.filter(suggestion => {
      const keep =
        count < 20 &&
        suggestion[searchKey].toLowerCase().includes(inputValue);

      if (keep) {
        count += 1;
      }

      return keep;
    })

    return inputLength === 0
      ? []
      : search === 'drug' ? suggestionList : [{ name: value }].concat(suggestionList);
  };

  const getSuggestionValue = suggestion => {
    return suggestion[searchKey];
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    if (search === "adverse_effect") inputChange(suggestion);
    if (search === "disease") {
      suggestion.id ?
        inputChange(suggestion) : inputAdd(suggestion.name)
    }
    if (search === "drug") submit(suggestion.id);
  };

  const renderSuggestion = (suggestion, { query, isHighlited }) => {
    const matches = match(suggestion[searchKey], query);
    const parts = parse(suggestion[searchKey], matches);
    return (
      <RecommendContainer>
        <ItemContainer>
          {parts.map((part, index) =>
            part.highlight ? (
              <b key={index} style={{ color: "#00a2ff" }}>
                {part.text}
              </b>
            ) : (
                <span key={index}>{part.text}</span>
              )
          )}
        </ItemContainer>
        {search === "drug" &&
          (currentDrugs && currentDrugs.includes(suggestion.id) ? (
            <BasicText size="0.7rem" opacity="0.7">
              복용중
            </BasicText>
          ) : (
              <Add
                onClick={e => {
                  e.stopPropagation();
                  addCurrentDrug("add", suggestion.id);
                }}
              />
            ))}
      </RecommendContainer>
    );
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    if (search === "drug") {
      inputChange(newValue);
    }

    if (search === 'disease') {
      // console.log(event.keyCode)
      // inputChange(newValue)
    }
  };

  const onKeyDown = (event) => {
    // console.log(event.keyCode)
    if (event.keyCode === 13) {
      console.log(value)
      inputAdd(value)
    }
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    // console.log(value)
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: placeholderProp,
    value,
    onChange: onChange,
    onKeyDown: onKeyDown
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
