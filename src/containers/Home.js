import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthStore";

const Box = styled.div`
  width: 100%;
  height: 400px;
  background-color: var(--twoyak-blue);
  margin: 1rem 0;
`;

function Home() {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    dispatch({
      type: "SET_AUTH_REDIRECT_PATH",
      path: null
    });
  }, [dispatch]);

  return (
    <>
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
    </>
  );
}

export default Home;
