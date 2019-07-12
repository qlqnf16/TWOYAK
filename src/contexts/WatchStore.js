import React, { useEffect, useContext } from "react";
import { AuthContext } from "./AuthStore";

function WatchStore(props) {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    async function AutoLogin() {
      if (localStorage.getItem("token")) {
        await dispatch({
          type: "SIGNIN_SUCCESS",
          token: localStorage.getItem("token")
        });
        await dispatch({
          type: "SET_AUTH_REDIRECT_PATH",
        });
      }
    }
    AutoLogin();
  }, [dispatch]);

  return <div>{props.children}</div>;
}

export default WatchStore;
