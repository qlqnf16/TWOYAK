import React, { useReducer, useEffect, useContext } from "react";
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
  const { state: authState } = useContext(AuthContext);

  const fetchInitialData = async () => {
    const payload = await Promise.all([
      axios.get("autocomplete/drug"),
      axios.get("autocomplete/adverse_effect")
    ]);
    dispatch({ type: "SET_INIT_DATA", payload: payload });
  };
  useEffect(() => {
    fetchInitialData();
  }, [authState]);

  return (
    <DrugContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DrugContext.Provider>
  );
};

export default DrugStore;
