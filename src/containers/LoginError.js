import React from "react";
import styled from "styled-components";
import { BasicButton } from "../components/UI/SharedStyles";

const ErrorMessage = styled.div`
  margin: 100px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomButton = styled(BasicButton)`
  margin-top: 10px;
`;

function LoginError(props) {
  return (
    <ErrorMessage>
      <div>해당 이메일은 이미 가입한 이메일입니다.</div>
      <CustomButton onClick={() => props.history.push("/login")}>
        다시 로그인하기
      </CustomButton>
    </ErrorMessage>
  );
}

export default LoginError;
