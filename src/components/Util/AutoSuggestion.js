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

const AddSmall = styled(Add)`
  width: 15px;
  height: 15px;
`

const AutoSuggestion = ({
  search,
  searchKey,
  placeholderProp,
  addCurrentDrug,
  currentDrugs,
  inputChange,
  inputAdd,
  submit,
}) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { state } = useContext(DrugContext);
  const { adverse_effects, diseases } = state;

  let suggestList = [];
  switch (search) {
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
        suggestion[searchKey].replace(/\s/g, '').includes(inputValue);
      if (keep) {
        count += 1;
      }

      return keep;
    })
    const basicInput = search === 'adverse_effect' ? [{ symptom_name: value }] : [{ name: value }]

    return inputLength === 0
      ? []
      : search === 'drug' || suggestionList.length === 1 ?
        suggestionList :
        basicInput.concat(suggestionList);
  };

  const getSuggestionValue = suggestion => {
    return suggestion[searchKey];
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
          (currentDrugs && currentDrugs.includes(suggestion.current_drug_id) ? (
            <BasicText size="0.7rem" opacity="0.7">
              복용중
            </BasicText>
          ) : (
              <Add
                onClick={e => {
                  e.stopPropagation();
                  addCurrentDrug("add", suggestion.current_drug_id);
                }}
              />
            ))}
        {search === 'adverse_effect' && <AddSmall />}
      </RecommendContainer>
    );
  };

  let suggestionSelected = false;

  const onSuggestionSelected = (event, { suggestion }) => {
    suggestionSelected = true;
    if (search === "adverse_effect")
      inputChange(suggestion);
    if (search === "disease") {
      suggestion.id ?
        inputChange(suggestion.name) : inputAdd(suggestion.name)
    }
    if (search === "drug") submit(suggestion.current_drug_id);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    if (search === 'disease' || search === 'drug') {
      inputChange(newValue)
    }
  };

  const onKeyDown = (event) => {
    if (search !== 'drug') {
      if (event.keyCode === 13 && !suggestionSelected) {
        inputAdd(value)
      }
      suggestionSelected = false;
    }
  }

  const onSuggestionsFetchRequested = async ({ value }) => {
    if (search === 'drug') {
      clearTimeout(null)
      setTimeout(async () => {
        let { data } = await axios.get('/searchSingle', { params: { search_term: value } })
        suggestList = await data.item_name
        await setSuggestions(getSuggestions(value));
      }, 300)

    } else {
      setSuggestions(getSuggestions(value))
    }
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
