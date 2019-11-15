import React, { useReducer, useEffect, useContext, useState } from "react";
import { drugReducer } from "./reducers";
import axios from "../apis";
import { AuthContext } from "./AuthStore";

export const DrugContext = React.createContext();

const DrugStore = props => {
  const [state, dispatch] = useReducer(drugReducer, {
    drugs: null,
    adverse_effects: null,
    diseases: null
  });
  const [loading, setLoading] = useState(false)
  const { state: authState } = useContext(AuthContext);

  // const fetchInitialData = async () => {
  //   const { data: payload } = await axios.get("autocomplete/drug")
  //   dispatch({ type: "SET_INIT_DATA", payload: payload });
  // };

  // useEffect(() => {
  //   if (localStorage.jwt_token) {
  //     if (authState.token) {
  //       fetchInitialData()
  //     }
  //   } else {
  //     fetchInitialData();
  //   }
  // }, [authState.token]);

  return (
    <DrugContext.Provider value={{ state, dispatch, loading, setLoading }}>
      {props.children}
    </DrugContext.Provider>
  );
};

export default DrugStore;
