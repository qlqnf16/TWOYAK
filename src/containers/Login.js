import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthStore";
import axios from "../apis";
import styled from "styled-components";

import { Container } from "../components/UI/SharedStyles";
import { BasicButton } from "../components/UI/SharedStyles";
import { BasicInput } from "../components/UI/SharedStyles";
import FacebookIcon from "../assets/images/facebook.svg";
import NaverIcon from "../assets/images/naver.svg";
import GoogleIcon from "../assets/images/google-signin.svg";

const LoginArea = styled(Container)`
  padding-top: 42px;
  margin: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomButton = styled(BasicButton)`
  padding-right: 3rem;
  padding-left: 3rem;
  margin-bottom: 1.3125rem;
`;

const LoginInput = styled(BasicInput)`
  margin-bottom: 1.3125rem;
`;

const Divider = styled.div`
  width: 20.1875rem;
  height: 1px;
  opacity: 0.26;
  border: solid 1px var(--twoyak-blue);
  margin: auto auto 1.3125rem auto;
`;

const AuthFunctionArea = styled.div`
  width: 17rem;
  display: flex;
  justify-content: space-around;
  padding-bottom: 2.5rem;
  margin: auto;
`;

const AuthFunctionKey = styled.div`
  width: auto;
  font-size: 0.875rem;
  color: #c8c8c8;
  cursor: pointer;
`;

const SocialLoginArea = styled.div`
  width: 15rem;
  display: flex;
  justify-content: space-around;
  margin: auto;
`;

const LoginErrorMessage = styled.div`
  color: red;
  margin-bottom: 1.3125rem;
`;

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    dispatch({
      type: "SET_AUTH_REDIRECT_PATH",
      path: null
    });
    if (
      props.location.search !== "" &&
      props.location.search.includes("?token=")
    ) {
      dispatch({
        type: "SIGNIN_SUCCESS",
        token: props.location.search.split("=")[1]
      });
      dispatch({
        type: "SET_AUTH_REDIRECT_PATH",
        path: "/"
      });
      window.location.replace("/login");
    }
  }, [props.history, props.location.search, dispatch]);

  const signinBySocialAccount = supplier => {
    window.open(`http://api.twoyak.com/api/users/auth/${supplier}`, "_self");
  };

  const signinDataHandler = (key, event) => {
    if (key === "email") {
      setEmail(event.target.value);
    } else if (key === "password") {
      setPassword(event.target.value);
    }
  };

  const signinActionHandler = () => {
    dispatch({ type: "SIGNIN_START" });
    const signinData = {
      email: email,
      password: password
    };
    axios
      .post("api/users/login", signinData)
      .then(response => {
        const payload = response.data.auth_token;
        dispatch({
          type: "SIGNIN_SUCCESS",
          token: payload
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: "SIGNIN_FAIL",
          error: error.response.data.errors
        });
      });
  };

  const authFunction = authFunction => {
    props.history.push(authFunction.action);
  };

  const AuthFunctions = [
    {
      label: "비밀번호 찾기",
      action: "find-password"
    },
    {
      label: "회원가입",
      action: "sign-up"
    }
  ];

  return (
    <Container>
      <LoginArea>
        <Form
          onSubmit={event => {
            event.preventDefault();
            signinActionHandler();
          }}
        >
          <LoginInput
            type="email"
            placeholder="이메일"
            onChange={event => signinDataHandler("email", event)}
          />
          <LoginInput
            type="password"
            placeholder="비밀번호"
            onChange={event => signinDataHandler("password", event)}
          />
          {state.error
            ? state.error
                .split(".")
                .map((i, k) => (
                  <LoginErrorMessage key={k}>{i}</LoginErrorMessage>
                ))
            : null}
          <CustomButton onClick={() => signinActionHandler()}>
            로그인
          </CustomButton>
        </Form>
        <Divider />
        <AuthFunctionArea>
          {AuthFunctions.map((i, k) => (
            <AuthFunctionKey key={k} onClick={() => authFunction(i)}>
              {i.label}
            </AuthFunctionKey>
          ))}
        </AuthFunctionArea>
        <SocialLoginArea>
          <img
            src={FacebookIcon}
            alt="facebook-signin"
            onClick={() => signinBySocialAccount("facebook")}
          />
          <img
            src={NaverIcon}
            alt="naver-signin"
            onClick={() => signinBySocialAccount("naver")}
          />
          <img
            src={GoogleIcon}
            alt="google-signin"
            onClick={() => signinBySocialAccount("google_oauth2")}
          />
        </SocialLoginArea>
        {state.token ? <Redirect to="/" /> : null}
      </LoginArea>
    </Container>
  );
}

export default Login;
