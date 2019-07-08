import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthStore';
import jwt_decode from 'jwt-decode';
import axios from '../apis';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if ( props.location.search !== "" && props.location.search.includes('?token=') ) {
      storeUserDataForAutoLogin('token', props.location.search.split('=')[1])
      dispatch({
        type: "SET_AUTH_REDIRECT_PATH",
        path: "/medicine"})
    }
  }, [props.history, props.location.search, dispatch]);

  const storeUserDataForAutoLogin = (key, value) => {
    localStorage.setItem(key, value);
  }

  const signinBySocialAccount = ( supplier ) => {
    window.open(`https://api.twoyak.com/api/users/auth/${supplier}`, '_self')
  };

  const signinDataHandler = (key, event) => {
    if (key === "email") {
      setEmail(event.target.value)
    } else if (key === "password") {
      setPassword(event.target.value)
    }
  };

  const signinActionHandler = () => {
    dispatch({type: "SIGNIN_START"})
    const signinData = {
      email: email,
      password: password,
    }
    axios
      .post("api/users/login", signinData)
      .then(response => {
        const payload = response.data.auth_token;
        dispatch({
          type: "SIGNIN_SUCCESS", 
          token: payload, 
          userId: jwt_decode(payload).user.id  
        })
        storeUserDataForAutoLogin('token', payload)
        dispatch({
          type: "SET_AUTH_REDIRECT_PATH",
          path: "/medicine",
        })
      })
      .catch( error => dispatch({
        type: "SIGNIN_FAIL",
        error: error.response.data.errors
      }))
  }

  const signout = () => {
    dispatch({
      type: "SIGNOUT",
    })
  }

  return (
    <div>
      <div>{JSON.stringify(state)}</div>
      <input onChange={(event) => signinDataHandler('email', event)} />
      <input onChange={(event) => signinDataHandler('password', event)} />
      <button onClick={() => signinActionHandler()}>그냥 로그인</button>
      <button onClick={() => signinBySocialAccount('google_oauth2')}>구글 로그인</button>
      {/* <button onClick={() => socialLogin('facebook')}>페이스북 로그인</button>
      <button onClick={() => socialLogin('naver')}>네이버 로그인</button> */}
      <button onClick={() => signout()}>로그아웃</button>
      {state.authRedirectPath ? <Redirect to={state.authRedirectPath} /> : null}
    </div>
  )
};

export default Login;