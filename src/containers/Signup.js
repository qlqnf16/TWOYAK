import React, { useState, useContext } from 'react';
import axios from '../apis';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthStore';
import jwt_decode from 'jwt-decode';
import styled from 'styled-components';

import { Container } from '../components/UI/SharedStyles';
import { BasicButton } from '../components/UI/SharedStyles';
import { BasicInput } from '../components/UI/SharedStyles';

const SignupArea = styled(Container)`
  padding-top: 6rem;
  margin: auto;
`

const CustomButton = styled(BasicButton)`
  width: 8.5rem;
  height: 3rem;
  margin-bottom: 1.3125rem;
`

const SignupInput = styled(BasicInput)`
  margin-bottom: 1.3125rem;
`

const GoLoginMark = styled.div`
  font-size: 0.75rem;
  opacity: 0.39;
  margin-bottom: 1.3125rem;
`

function Signup(props) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [userName, setUserName] = useState(null);

  const { state, dispatch } = useContext(AuthContext);

  const goLoginPage = () => {
    props.history.push('/login')
  };

  const signupScheme = [
    {
      type: 'email',
      placeholder: '이메일',
      key: 'email',
    },
    {
      type: 'password',
      placeholder: '비밀번호',
      key: 'password',
    },
    {
      type: 'password',
      placeholder: '비밀번호 확인',
      key: 'password-confirmation',
    },
    {
      type: 'text',
      placeholder: '닉네임',
      key: 'user-name',
    },
  ];

  const fillInSignupForm = (key, event) => {
    switch (key) {
      case 'email': setEmail(event.target.value);
      case 'password': setPassword(event.target.value);
      case 'password-confirmation': setConfirmPassword(event.target.value);
      case 'user-name': setUserName(event.target.value)
      default:
    }
  };

  const storeUserDataForAutoLogin = (key, value) => {
    localStorage.setItem(key, value);
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
      drink: false,
      smoke: false,
      caffeine: false,
      sex: null,
    }
    axios.post(
        '/api/users',
        signupData
      )
      .then(response => {
        const payload = response.data.auth_token;
        dispatch({
          type: "SIGNUP_SUCCESS",
          token: payload,
          userId: jwt_decode(payload).user.id,
          userName: jwt_decode(payload).user.user_name,
        })
        storeUserDataForAutoLogin('token', payload)
        dispatch({
          type: "SET_AUTH_REDIRECT_PATH",
          path: "/add-info"
        })
      })
      .catch(error => {
        dispatch({
          type: "SIGNUP_FAIL",
          error: error.response.data.errors
        })
      })
    console.log(state);
    console.log(signupData)
  }

  const form = signupScheme.map((i, k) => (
      <SignupInput key={k} type={i.type} placeholder={i.placeholder} onChange={event => fillInSignupForm(i.key, event)} />
  ))

  return (
    <SignupArea>
      <GoLoginMark onClick={() => goLoginPage()}>
        이미 아이디가 있으신가요? 로그인하러가기
      </GoLoginMark>
      {form}
      <CustomButton onClick={() => signupActionHandler()}>
        회원가입
      </CustomButton>
      {state.authRedirectPath ? <Redirect to={state.authRedirectPath} /> : null}
    </SignupArea>
  )
};

export default Signup;