import React from "react";
import styled from "styled-components";

import { BasicInput } from "../UI/SharedStyles";

const NicknameInputContainer = styled.div`
  margin-top: 33px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 5rem;
  justify-content: space-evenly;
`;

const Category = styled.div`
  width: auto;
  font-size: 0.875rem;
  font-weight: 800;
  height: 1rem;
  opacity: 0.6;
  color: var(--twoyak-blue);
`;

const NicknameInput = styled(BasicInput)`
  width: 16rem;
  height: 3rem;
  margin-top: 0.6875rem;
  text-align: center;
`;

function Nickname({ value, getNickname }) {
  const getInNickName = name => {
    getNickname(name.target.value);
  };

  return (
    <NicknameInputContainer>
      <Category>닉네임</Category>
      <NicknameInput
        type="text"
        placeholder="추가 사용자의 닉네임을 입력하세요"
        value={value}
        onChange={name => getInNickName(name)}
      />
    </NicknameInputContainer>
  );
}

export default Nickname;
