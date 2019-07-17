import React, { useEffect, useReducer } from "react";
import { authReducer } from "./reducers";

export const AuthContext = React.createContext();

const AuthStore = props => {
  const [state, dispatch] = useReducer(authReducer, {
    token: null,
    userName: null,
    subUsers: null,
    subUserId: null,
    subUserIndex: 0,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: null
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthStore;
