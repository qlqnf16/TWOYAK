import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import axios from "../apis";
import {
  BasicInput,
  BasicButton,
  Divider
} from "../components/UI/SharedStyles";
import Spinner from "../components/UI/Spinner";

const FindPasswordContainer = styled.div`
  padding-left: 0.5625rem;
  padding-right: 0.5625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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

function FindPassword(props) {
  const [emailTyped, setEmailTyped] = useState("");
  const [passwordTyped, setPasswordTyped] = useState("");
  const [passwordConfirmationTyped, setPasswordConfirmationTyped] = useState(
    ""
  );
  const [completeRedirect, setCompleteRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  if (props.match.path === "/find-password") {
    const postResetPasswordEmailHandler = () => {
      setLoading(true);
      axios({
        method: "POST",
        url: "/api/users/password",
        params: {
          email: emailTyped
        }
      })
        .then(response => {
          setLoading(false);
          response.data.status === "ok"
            ? alert(
                "비밀번호 변경 이메일을 보내드렸습니다. 받은 메일함에서 확인하실 수 있습니다."
              )
            : alert("이메일을 다시 한번 확인해주세요.");
        })
        .catch(error => {
          setLoading(false);
          alert("이메일을 다시 한번 확인해주세요.");
        });
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
          {loading ? (
            <Spinner />
          ) : (
            <ResetButton onClick={() => postResetPasswordEmailHandler()}>
              비밀번호 재설정 이메일 보내기
            </ResetButton>
          )}
        </FindPasswordWrapper>
      </FindPasswordContainer>
    );
  } else if (props.match.path === "/reset-password") {
    const postResetPasswordHandler = () => {
      if (passwordTyped !== passwordConfirmationTyped) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      } else {
        if (
          props.location.search !== "" &&
          props.location.search.includes("?token")
        ) {
          axios({
            method: "PUT",
            url: "/api/users/password",
            params: {
              user: {
                reset_password_token: props.location.search.split("=")[1],
                password: passwordTyped,
                password_confirmation: passwordConfirmationTyped
              }
            }
          })
            .then(response => {
              alert("비밀번호가 재설정되었습니다");
              setCompleteRedirect(true);
            })
            .catch(error => console.log(error));
        }
      }
    };
    return (
      <FindPasswordContainer>
        <Header>비밀번호 재설정</Header>
        <Divider />
        <FindPasswordWrapper>
          <BasicInput
            value={passwordTyped}
            onChange={e => setPasswordTyped(e.target.value)}
            type="password"
            placeholder="새로운 비밀번호를 입력하세요."
          />
          <br />
          <BasicInput
            value={passwordConfirmationTyped}
            onChange={e => setPasswordConfirmationTyped(e.target.value)}
            type="password"
            placeholder="새로운 비밀번호를 한번 더 입력하세요."
          />
          <ResetButton onClick={() => postResetPasswordHandler()}>
            비밀번호 재설정 하기
          </ResetButton>
        </FindPasswordWrapper>
        {completeRedirect ? <Redirect to="login" /> : null}
      </FindPasswordContainer>
    );
  }
}

export default FindPassword;
