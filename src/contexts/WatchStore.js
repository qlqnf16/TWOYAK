import React, { useEffect, useContext } from "react";
import { AuthContext } from "./AuthStore";

function WatchStore(props) {
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    function AutoLogin() {
      if (localStorage.getItem("token")) {
        dispatch({
          type: "SIGNIN_SUCCESS",
          token: localStorage.getItem("token")
        });
        dispatch({
          type: "SET_AUTH_REDIRECT_PATH",
          path: "/"
        })
      }
    }
    AutoLogin();
  }, [dispatch]);

  return <div>{props.children}</div>;
}

export default WatchStore;
