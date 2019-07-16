import React from "react";
import AutoSuggestion from "../../Util/AutoSuggestionUserInfo";
import styled from "styled-components";

const StyleWrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  position: relative;
  width: 16rem;
  height: 3rem;
  border-radius: 1.5rem;
  border: solid 1px var(--twoyak-blue);
  padding-left: 1.0937rem;
  padding-right: 1.0937rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & .react-autosuggest__input {
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    border-width: 0;
    font-size: 1rem;
  }

  & .react-autosuggest__suggestions-container--open {
    width: calc(100% + 50px);
    height: 50vh;
    overflow: scroll;
    margin: 0;
    position: absolute;
    top: 50px;
    background-color: white;
    border: 1px solid white;
    z-index: 300;
  }

  & .react-autosuggest__suggestions-list {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  & .react-autosuggest__suggestion {
    list-style-type: none;
    font-size: 0.94rem;
    margin-bottom: -1px;
    color: var(--twoyak-black);
    cursor: pointer;
    padding: 0.75rem 0;
    font-weight: bold;
    border-bottom: 1px #e6f6ff solid;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & .react-autosuggest__suggestion--highlighted {
    /* background-color: aliceblue; */
  }
`;

function SearchInput({ diseaseArray, appendDiseaseId }) {
  return (
    <StyleWrapper>
      <AutoSuggestion
        search="disease"
        diseaseSearchTerms={diseaseArray}
        placeholderProp={"ex) 고혈압, 당뇨"}
        searchKey="name"
        appendDiseaseId={suggestion => appendDiseaseId(suggestion)}
      />
    </StyleWrapper>
  );
}

export default SearchInput;
