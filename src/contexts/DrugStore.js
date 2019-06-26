import React, { useReducer, useEffect } from "react";
import { drugReducer } from "./reducers";
import axios from "../apis";

export const DrugContext = React.createContext();

const DrugStore = props => {
  const [drugs, dispatch] = useReducer(drugReducer, null);

  const fetchInitialData = () => {
    axios.get("autocomplete/drug").then(response => {
      dispatch({ type: "SET_INIT_DATA", payload: response.data });
    });
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <DrugContext.Provider value={{ drugs, dispatch }}>
      {props.children}
    </DrugContext.Provider>
  );
};

export default DrugStore;
