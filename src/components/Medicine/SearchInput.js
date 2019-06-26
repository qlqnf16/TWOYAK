import React from "react";
import styled from "styled-components";
import DrugSuggest from "./DrugSuggest";

const FlexForm = styled.form`
  display: flex;
  align-items: center;
  margin: 1rem;
`;

const Button = styled.button`
  height: 35px;
  width: 70px;
  border-width: 0;
  border-radius: 3px;
  background-color: #2779a9;
  font-size: 16px;
  color: white;
`;

const SearchInput = props => {
  const myInput = (
    <FlexForm onSubmit={props.searchTerms}>
      <DrugSuggest />
      <Button type="submit">검색</Button>
    </FlexForm>
  );
  return myInput;
};

export default SearchInput;
