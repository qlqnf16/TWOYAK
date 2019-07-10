import React, { useEffect, useContext } from "react";
import { AuthContext } from "./AuthStore";
import jwt_decode from "jwt-decode";

function WatchStore(props) {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch({
        type: "SIGNIN_SUCCESS",
        token: localStorage.getItem("token"),
        userId: jwt_decode(localStorage.getItem("token")).user.id,
        userName: jwt_decode(localStorage.getItem("token")).user.user_name,
        userInfoId: jwt_decode(localStorage.getItem("token")).user.user_info_id,
      });
      dispatch({
        type: "SET_AUTH_REDIRECT_PATH",
        path: "/medicine"
      });
    }
  }, [dispatch]);

  return <div>{props.children}</div>;
}

export default WatchStore;
