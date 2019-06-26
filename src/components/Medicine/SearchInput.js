import React from "react";
import styled from "styled-components";

const FlexForm = styled.form`
  display: flex;
  align-items: center;
  margin: 1rem;
`;

const Input = styled.input`
  width: 490px;
  height: 30px;
  border-width: 0;
  border-bottom: 1px solid #dbdbdb;
  margin-right: 0.3rem;
  font-size: 1rem;
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
      <Input
        type="text"
        onChange={props.inputChange}
        placeholder="약품명 또는 성분명을 입력해주세요"
      />
      <Button type="submit">검색</Button>
    </FlexForm>
  );
  return myInput;
};

export default SearchInput;
