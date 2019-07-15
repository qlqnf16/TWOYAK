import { updateObject } from './utility';
import jwt_decode from 'jwt-decode';

export const drugReducer = (drugs, { type, payload }) => {
  switch (type) {
    case "SET_INIT_DATA":
      return { drugs: payload[0].data, adverse_effects: payload[1].data };
    default:
      break;
  }
};

export const authReducer = (state, action) => {
  const signinStart = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: true,
    })
  };
  
  const signinSuccess = (state, action) => {
    localStorage.setItem('token', action.token)
    return updateObject(state, {
      token: action.token,
      userName: jwt_decode(action.token).user.sub_users[0].user_name,
      subUsers: jwt_decode(action.token).user.sub_users,
      subUserId: jwt_decode(action.token).user.sub_users[0].id,
      userId: jwt_decode(action.token).user.id,
      error: null,
      loading: false,
    })
  };
  
  const signinFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false
    })
  };

  const signupStart = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: true,
    })
  };

  const signupSuccess = (state, action) => {
    localStorage.setItem('token', action.token)
    return updateObject(state, {
      token: action.token,
      userName: jwt_decode(action.token).user.sub_users[0].user_name,
      subUsers: jwt_decode(action.token).user.sub_users,
      subUserId: jwt_decode(action.token).user.sub_users[0].id,
      userId: jwt_decode(action.token).user.id,
      error: null,
      loading: false,
    })
  };

  const signupFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false,
    })
  };
  
  const signout = (state, action) => {
    localStorage.clear();
    return updateObject(state, {
      token: null,
      userId: null,
      userName: null,
      subUsers: null,
      subUserId: null,
    })
  };
  
  const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
      authRedirectPath: action.path
    })
  };

  switch (action.type) {
    case "SIGNIN_START": return signinStart(state, action);
    case "SIGNIN_SUCCESS": return signinSuccess(state, action);
    case "SIGNIN_FAIL": return signinFail(state, action);
    case "SIGNUP_START": return signupStart(state, action);
    case "SIGNUP_SUCCESS": return signupSuccess(state, action);
    case "SIGNUP_FAIL": return signupFail(state, action);
    case "SIGNOUT": return signout(state, action);
    case "SET_AUTH_REDIRECT_PATH": return setAuthRedirectPath(state, action);
    default:
  }
}