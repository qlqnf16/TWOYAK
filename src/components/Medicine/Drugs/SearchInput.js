import React from "react";
import styled from "styled-components";
import AutoSuggestion from "../../Util/AutoSuggestion";
import { breakpoints, BasicButton, FlexForm } from "../../UI/SharedStyles";

import "@fortawesome/fontawesome-free/css/all.css";
import { ReactComponent as Search } from "../../../assets/images/search-icon.svg";

const Form = styled(FlexForm)`
  align-items: center;
  @media (min-width: ${breakpoints.medium}) {
    margin: 1rem;
  }
`;

const ArrowIcon = styled.i`
  display: block;
  color: var(--twoyak-black);
  font-size: 1.5rem;
  margin-right: 10px;
`;

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
    font-size: 1rem;
    @media (max-width: ${breakpoints}) {
      width: 100%;
    }
  }

  & .react-autosuggest__suggestions-container--open {
    width: calc(100% + 80px);
    height: 50vh;
    overflow: scroll;
    margin: 0;
    position: absolute;
    left: -30px;
    top: 50px;
    background-color: white;
    border: 1px solid white;
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

const Button = styled(BasicButton)`
  height: 35px;
  width: 70px;
  border-radius: 3px;
  margin-left: 0.3rem;
  @media (max-width: ${breakpoints.medium}) {
    width: 100%;
    margin: 0.3rem 0;
  }
`;

const SearchInput = ({ searchTerms, inputChange, goBack }) => {
  const myInput = (
    <Form onSubmit={searchTerms}>
      <ArrowIcon className="fas fa-arrow-left" onClick={goBack} />
      <StyleWrapper>
        <AutoSuggestion
          search="drug"
          placeholderProp={"약품명 또는 성분명을 입력해주세요"}
          searchKey="name"
          inputChange={inputChange}
          submit={searchTerms}
        />
      </StyleWrapper>
      <Search onClick={searchTerms} />
      {/* <Button type="submit">검색</Button> */}
    </Form>
  );
  return myInput;
};

export default SearchInput;
