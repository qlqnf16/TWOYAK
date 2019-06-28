import React, { useReducer, useEffect } from "react";
import { drugReducer } from "./reducers";
import axios from "../apis";

export const DrugContext = React.createContext();

const DrugStore = props => {
  const [state, dispatch] = useReducer(drugReducer, {
    drugs: null,
    adverse_effects: null
  });

  const fetchInitialData = async () => {
    const payload = await Promise.all([
      axios.get("autocomplete/drug"),
      axios.get("autocomplete/adverse_effect")
    ]);
    dispatch({ type: "SET_INIT_DATA", payload: payload });
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <DrugContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DrugContext.Provider>
  );
};

export default DrugStore;
