import React from "react";
import styled from "styled-components";
import AutoSuggestion from "../../Util/AutoSuggestion";
import { breakpoints, BasicButton, FlexForm } from "../../UI/SharedStyles";

const Form = styled(FlexForm)`
  margin: 1rem;
  @media (max-width: ${breakpoints.medium}) {
    display: block;
  }
`;

const Button = styled(BasicButton)`
  height: 35px;
  width: 70px;
  border-radius: 3px;
  margin-left: 0.3rem;
    @media (max-width: ${breakpoints.medium}) {
    width: 100%
    margin: 0.3rem 0;
  }
`;

const SearchInput = ({ searchTerms, inputChange }) => {
  const myInput = (
    <Form onSubmit={searchTerms}>
      <AutoSuggestion
        search="drug"
        placeholderProp="약품명 또는 성분명을 입력해주세요"
        searchKey="name"
        inputChange={inputChange}
      />
      <Button type="submit">검색</Button>
    </Form>
  );
  return myInput;
};

export default SearchInput;
