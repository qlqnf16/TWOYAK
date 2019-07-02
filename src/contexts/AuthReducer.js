
export const authReducer = (auth, { type, token, userId, error, loading, authRedirectPath }) => {
  switch (type) {
    case "SIGNIN_START":
      return { 
        loading: loading,
      }
    case "SIGNIN_SUCCESS":
      return {
        token: token,
        userId: userId,
        loading: loading,
      }
    case "SIGNIN_FAIL":
      return {
        error: error,
        loading: false,
      }
    case "SIGNOUT":
      return {
        token: token,
        userId: userId,
      }
    case "SET_AUTH_REDIRECT_PATH":
      return {
        authRedirectPath: authRedirectPath
      }
  };
};