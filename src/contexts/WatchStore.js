import React, { useEffect, useContext } from "react";
import { AuthContext } from "./AuthStore";

function WatchStore(props) {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    function AutoLogin() {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        localStorage.removeItem("user_info_id");
        localStorage.removeItem("email");
        localStorage.removeItem("user_name");
        localStorage.removeItem("id");
      }
      if (localStorage.getItem("jwt_token")) {
        dispatch({
          type: "SIGNIN_SUCCESS",
          token: localStorage.getItem("jwt_token")
        });
        dispatch({
          type: "SET_AUTH_REDIRECT_PATH",
          path: "/"
        });
      }
    }
    AutoLogin();
  }, [dispatch]);

  return <div>{props.children}</div>;
}

export default WatchStore;
