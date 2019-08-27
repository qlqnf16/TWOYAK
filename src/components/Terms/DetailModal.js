import React from "react";
import styled from "styled-components";
import Terms from "./Terms";

const ModalContainer = styled.div`
  width: 100%;
  z-index: 100;
  height: 100vh;
  padding: 0 20px 20px 20px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;
  overflow: auto;
`;

function DetailModal({ routes }) {
  return (
    <ModalContainer>
      <Terms routes={routes} />
    </ModalContainer>
  );
}

export default DetailModal;
