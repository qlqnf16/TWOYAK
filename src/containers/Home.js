import React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  height: 400px;
  background-color: blue;
  margin: 1rem;
`;

function Home() {
  return (
    <div>
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
    </div>
  );
}

export default Home;
