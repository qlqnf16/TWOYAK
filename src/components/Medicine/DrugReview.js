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

const DrugReview = ({ review, deleteReview }) => {
  return (
    <Container>
      <Flex>
        <div>{review.user_email}</div>
        <SpaceSpan>|</SpaceSpan>
        <div>{review.age}</div>
        {review.sex && (
          <>
            <SpaceSpan>|</SpaceSpan>{" "}
            <div>{review.sex === true ? "남" : "여"}</div>
          </>
        )}
      </Flex>
      <Flex>
        <div>평점: {review.efficacy}점</div>
        {review.adverse_effects.length > 0 && (
          <>
            <SpaceSpan>|</SpaceSpan>
            <div>이상반응: {review.adverse_effects}</div>
          </>
        )}
      </Flex>
      <div>{review.body}</div>
      <button onClick={() => deleteReview(review.id)}>삭제하기</button>
    </Container>
  );
};

export default DrugReview;
