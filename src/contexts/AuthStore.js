import React, { useReducer } from 'react';
import { authReducer } from './AuthReducer';
import axios from '../apis';
import jwt_decode from "jwt-decode";

export const AuthContext = React.createContext();

const AuthStore = props => {
  const [state, dispatch] = useReducer(authReducer, {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: null,
  });

  const signinStart = () => {
    dispatch({
      type: "SIGNIN_START",
      loading: true,
    })
  };

  const signinSuccess = (token, userId) => {
    dispatch({
      type: "SIGNIN_SUCCESS",
      token: token,
      userId: userId,
      loading: false,
    })
  };

  const signinFail = (error) => {
    dispatch({
      type: "SIGNIN_FAIL",
      error: error,
      loading: false,
    })
  };

  const signout = () => {
    dispatch({
      type: 'SIGNOUT',
      token: null,
      userId: null,
    })
  };

  const setAuthRedirectPath = (path) => {
    dispatch({
      type: "SET_AUTH_REDIRECT_PATH",
      authRedirectPath: path,
    })
  };

  const signin = (email, password) => {
    const signinData = {
      email: email,
      password: password,
    }
    signinStart();
    axios
      .post("api/users/login", signinData)
      .then(response => {
        const payload = response.data.auth_token;
        console.log(payload)
        signinSuccess(payload, jwt_decode(payload).user.user_name)
      })
      .catch(error => signinFail(error.response.data.errors))
  };

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthStore;