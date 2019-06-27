import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #f3f6f9;
  border-radius: 5px;
  font-size: 0.9rem;
  margin: 5px 0;
`;

const Flex = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const SpaceSpan = styled.span`
  margin: 0 0.5rem;
  color: #9c9c9c;
`;

const DrugReview = ({ review }) => {
  return (
    <Container>
      {/* <div>{review.user_email}</div>
      <div>{review.age}</div>
      <div>평점: {review.efficacy}</div>
      <div>{review.disease}</div>
      <div>{review.adverse_effects}</div>
      <div>{review.body}</div> */}
      <Flex>
        <div>{review.user_email}</div>
        <SpaceSpan>|</SpaceSpan>
        <div>{review.age}</div>
      </Flex>
      <Flex>
        <div>평점: {review.efficacy}점</div>
        <SpaceSpan>|</SpaceSpan>
        <div>
          이상반응:{" "}
          {review.adverse_effects.length > 0 ? review.adverse_effects : "없음"}
        </div>
      </Flex>
      <div>{review.body}</div>
    </Container>
  );
};

export default DrugReview;
