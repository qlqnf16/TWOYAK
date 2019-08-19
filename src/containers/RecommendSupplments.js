import React from "react";
import styled from "styled-components";

import close from "../assets/images/erase.svg";

const RecommendSupplementsContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding-left: 1.875rem;
  padding-right: 1.875rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: white;
  overflow: auto;
  display: flex;
  justify-content: center;
`;

const CloseImg = styled.img`
  position: absolute;
  top: 0.9375rem;
  left: 0.9375rem;
`;

const RecommendSupplementsWrapper = styled.div`
  margin-top: 5rem;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 800;
`;

function RecommendSupplements(props) {
  return (
    <RecommendSupplementsContainer>
      <CloseImg
        src={close}
        alt="close-button"
        onClick={() => props.history.goBack()}
      />
      <RecommendSupplementsWrapper>
        추천 건강기능식품
      </RecommendSupplementsWrapper>
    </RecommendSupplementsContainer>
  );
}

export default RecommendSupplements;
