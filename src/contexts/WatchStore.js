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
      } else if (localStorage.getItem("jwt_token")) {
        dispatch({
          type: "SIGNIN_SUCCESS",
          token: localStorage.getItem("jwt_token")
        });
      }
      if (
        props.location.search !== "" &&
        props.location.search.includes("?token=")
      ) {
        dispatch({
          type: "SIGNIN_SUCCESS",
          token: props.location.search.split("=")[1]
        });
      }
    }
    localStorage.removeItem("tutorial-show");
    AutoLogin();
  }, [props.location.search, dispatch]);

  return <div>{props.children}</div>;
}

export default WatchStore;
