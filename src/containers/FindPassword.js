import React, { useState } from "react";
import styled from "styled-components";
import axios from "../apis";
import {
  BasicInput,
  BasicButton,
  Divider
} from "../components/UI/SharedStyles";

const FindPasswordContainer = styled.div`
  margin: 90px 0.6rem 50px 0.6rem;
  padding-left: 0.5625rem;
  padding-right: 0.5625rem;
`;

const FindPasswordWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: space-around;
`;

const Header = styled.div`
  color: var(--twoyak-blue);
  font-weight: 800;
  margin-top: 90px;
`;

const ResetButton = styled(BasicButton)`
  margin-top: 1rem;
`;

function FindPassword() {
  const [emailTyped, setEmailTyped] = useState("");

  const postResetPasswordEmail = () => {
    axios({
      method: "POST",
      url: "/users/password",
      params: {
        email: emailTyped
      }
    })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  };

  return (
    <FindPasswordContainer>
      <Header>비밀번호 찾기</Header>
      <Divider />
      <FindPasswordWrapper>
        <BasicInput
          value={emailTyped}
          onChange={e => setEmailTyped(e.target.value)}
          placeholder="비밀번호를 찾고자 하는 이메일을 입력해 주세요."
        />
        <ResetButton onClick={() => postResetPasswordEmail()}>
          비밀번호 재설정 이메일 보내기
        </ResetButton>
      </FindPasswordWrapper>
    </FindPasswordContainer>
  );
}

export default FindPassword;
