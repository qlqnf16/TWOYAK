import React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  height: 400px;
  background-color: var(--twoyak-blue);
  margin: 1rem 0;
`;

function Home() {
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
