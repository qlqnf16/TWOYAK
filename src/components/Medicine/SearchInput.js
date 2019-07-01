import React from "react";
import styled from "styled-components";
import AutoSuggestion from "../Util/AutoSuggestion";
import { BasicButton, FlexForm } from "../UI/SharedStyles";

const Form = styled(FlexForm)`
  margin: 1rem;
`;

const Button = styled(BasicButton)`
  height: 35px;
  width: 70px;
  border-radius: 3px;
`;

const SearchInput = ({ searchTerms, inputChange }) => {
  const myInput = (
    <Form onSubmit={searchTerms}>
      <AutoSuggestion
        search="drug"
        placeholderProp="약품명 또는 성분명을 입력해주세요"
        searchKey="item_name"
        inputChange={inputChange}
      />
      <Button type="submit">검색</Button>
    </Form>
  );
  return myInput;
};

export default SearchInput;
