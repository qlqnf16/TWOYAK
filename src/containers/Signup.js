import React, { useState, useContext } from "react";
import axios from "../apis";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthStore";
import styled from "styled-components";

import { Container } from "../components/UI/SharedStyles";
import { BasicButton } from "../components/UI/SharedStyles";
import { BasicInput } from "../components/UI/SharedStyles";

const SignupArea = styled(Container)`
  padding-top: 6rem;
  margin: auto;
`;

const CustomButton = styled(BasicButton)`
  width: 8.5rem;
  height: 3rem;
  margin-bottom: 1.3125rem;
  text-align: center;
`;

const SignupInput = styled(BasicInput)`
  margin-bottom: 1.3125rem;
`;

const GoLoginMark = styled.div`
  font-size: 0.75rem;
  opacity: 0.39;
  margin-bottom: 1.3125rem;
`;

const SignupError = styled.div`
  color: red;
`;

function Signup(props) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [userName, setUserName] = useState(null);
  const { state, dispatch } = useContext(AuthContext);

  const goLoginPage = () => {
    props.history.push("/login");
  };

  const signupScheme = [
    {
      type: "email",
      placeholder: "이메일",
      key: "email"
    },
    {
      type: "password",
      placeholder: "비밀번호",
      key: "password"
    },
    {
      type: "password",
      placeholder: "비밀번호 확인",
      key: "password-confirmation"
    },
    {
      type: "text",
      placeholder: "닉네임",
      key: "user-name"
    }
  ];

  const fillInSignupForm = (key, event) => {
    switch (key) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "password-confirmation":
        setConfirmPassword(event.target.value);
        break;
      case "user-name":
        setUserName(event.target.value);
        break;
      default:
    }
  };

  const storeUserDataForAutoLogin = (key, value) => {
    localStorage.setItem(key, value);
  };

  const validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const signupActionHandler = () => {
    dispatch({
      type: "SIGNUP_START"
    });
    const signupData = {
      email: email,
      password: password,
      password_confirmation: confirmPassword,
      user_name: userName,
      birth_date: null,
      drink: null,
      smoke: null,
      caffeine: null,
      sex: null
    };
    axios
      .post("/api/users", signupData)
      .then(response => {
        const payload = response.data.auth_token;
        dispatch({
          type: "SIGNUP_SUCCESS",
          token: payload
        });
        storeUserDataForAutoLogin("token", payload);
      })
      .catch(error => {
        dispatch({
          type: "SIGNUP_FAIL",
          error: error.response.data.errors
        });
        alert(error.response.data.errors);
      });
  };

  const form = signupScheme.map((i, k) => (
    <form key={k} onSubmit={() => signupActionHandler()}>
      <SignupInput
        key={k}
        type={i.type}
        placeholder={i.placeholder}
        onChange={event => fillInSignupForm(i.key, event)}
      />
    </form>
  ));

  return (
    <SignupArea>
      <GoLoginMark onClick={() => goLoginPage()}>
        이미 아이디가 있으신가요? 로그인하러가기
      </GoLoginMark>
      {form}
      <CustomButton onClick={() => signupActionHandler()}>
        회원가입
      </CustomButton>
      {state.token ? <Redirect to="/add-info" /> : null}
    </SignupArea>
  );
}

export default Signup;
