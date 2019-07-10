import { updateObject } from './utility';

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
    return updateObject(state, {
      token: action.token,
      userId: action.userId,
      userName: action.userName,
      userInfoId: action.userInfoId,
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
    return updateObject(state, {
      token: action.token,
      userId: action.userId,
      userName: action.userName,
      userInfoId: action.userInfoId,
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
    return updateObject(state, {
      token: null,
      userId: null,
      userName: null,
      userInfoId: null,
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