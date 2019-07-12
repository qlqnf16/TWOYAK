import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthStore";
import jwt_decode from "jwt-decode";
import axios from "../apis";
import styled from "styled-components";

import { Container } from "../components/UI/SharedStyles";
import { BasicButton } from "../components/UI/SharedStyles";
import { BasicInput } from "../components/UI/SharedStyles";
import FacebookIcon from "../assets/images/facebook.svg";
import NaverIcon from "../assets/images/naver.svg";

const LoginArea = styled(Container)`
  padding-top: 4.7rem;
  margin: auto;
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
  margin-bottom: 1.3125rem;
`;

const AuthFunctionArea = styled.div`
  width: 17rem;
  display: flex;
  justify-content: space-around;
  margin-bottom: 2.5rem;
`;

const AuthFunctionKey = styled.div`
  width: auto;
  font-size: 0.875rem;
  color: #c8c8c8;
  cursor: pointer;
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 0.8125‬rem;
  opacity: 0.3;
  border: solid 1px #c8c8c8;
`;

const SocialLoginArea = styled.div`
  width: 15rem;
  display: flex;
  justify-content: space-around;
`;

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (
      props.location.search !== "" &&
      props.location.search.includes("?token=")
    ) {
      dispatch({
        type: "SIGNIN_SUCCESS",
        token: props.location.search.split("=")[1],
      })
      dispatch({
        type: "SET_AUTH_REDIRECT_PATH",
        path: "/"
      });
    }
  }, [props.history, props.location.search, dispatch]);

  const signinBySocialAccount = ( supplier ) => {
    window.open(`http://52.79.228.195/api/users/auth/${supplier}`, '_self')
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
        console.log(jwt_decode(response.data.auth_token));
        const payload = response.data.auth_token;
        dispatch({
          type: "SIGNIN_SUCCESS", 
          token: payload,
        })
        dispatch({
          type: "SET_AUTH_REDIRECT_PATH",
          path: "/medicine",
        })
      })
      .catch(error =>
        dispatch({
          type: "SIGNIN_FAIL",
          error: error.response.data.errors
        })
      );
  };

  const signout = () => {
    dispatch({
      type: "SIGNOUT"
    });
  };

  const authFunction = authFunction => {
    props.history.push(authFunction.action);
  };

  const AuthFunctions = [
    {
      label: "아이디 찾기",
      action: "seek-user-d"
    },
    {
      label: "비밀번호 찾기",
      action: "seek-user-password"
    },
    {
      label: "회원가입",
      action: "sign-up"
    }
  ];

  const responseGoogle = response => {
    console.log(response);
  };

  return (
    <Container>
      <LoginArea>
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
        <CustomButton onClick={() => signinActionHandler()}>
          로그인
        </CustomButton>
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
            src={NaverIcon}
            alt="google-signin"
            onClick={() => signinBySocialAccount("google_oauth2")}
          />
        </SocialLoginArea>
        {state.authRedirectPath ? (
          <Redirect to={state.authRedirectPath} />
        ) : null}
      </LoginArea>
    </Container>
  );
}

export default Login;
