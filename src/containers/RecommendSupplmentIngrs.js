import React from "react";
import styled from "styled-components";

import { BasicButton } from "../components/UI/SharedStyles";
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
  align-items: center;
  flex-direction: column;
`;

const CloseImg = styled.img`
  position: absolute;
  top: 0.9375rem;
  left: 0.9375rem;
`;

const RecommendSupplementsHeader = styled.div`
  margin-top: 5rem;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 800;
`;

const RecommendSupplementIngrWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2.1875rem;
`;

const RecommendSupplementIngr = styled.div`
  font-size: 1.125rem;
  font-weight: bold;
  color: var(--twoyak-blue);
`;

const DetailButton = styled.div`
  width: 4.375rem;
  height: 1.3125rem;
  opacity: 0.5;
  border-radius: 1.5rem;
  font-size: 0.6875rem;
  color: #ffffff;
  background-color: var(--twoyak-blue);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RecommendProductButton = styled(BasicButton)`
  margin-top: 2.187rem;
`;

function RecommendSupplements(props) {
  console.log(props);
  return (
    <RecommendSupplementsContainer>
      <CloseImg
        src={close}
        alt="close-button"
        onClick={() => props.history.goBack()}
      />
      <RecommendSupplementsHeader>추천 건강기능식품</RecommendSupplementsHeader>
      {/* {supplementIngrs.map((i, k) => (
        <RecommendSupplementIngrWrapper key={k}>
          <RecommendSupplementIngr>{i}</RecommendSupplementIngr>
          <DetailButton>자세히 보기</DetailButton>
        </RecommendSupplementIngrWrapper>
      ))} */}
      <RecommendProductButton
        onClick={() =>
          props.history.push(
            `/recommend-supplement-products/${props.match.params.ingrs}`
          )
        }
      >
        추천 상품 보러가기
      </RecommendProductButton>
    </RecommendSupplementsContainer>
  );
}

export default RecommendSupplements;
