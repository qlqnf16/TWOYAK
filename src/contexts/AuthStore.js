import React, { useReducer } from 'react';
import { authReducer } from './reducers';

export const AuthContext = React.createContext();

const AuthStore = props => {
  const [state, dispatch] = useReducer(authReducer, {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: null,
  });

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthStore;