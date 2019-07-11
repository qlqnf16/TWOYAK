import React, { useContext } from "react";
import styled from "styled-components";
import { BasicButton, StyledRating, RatingText } from "../../UI/SharedStyles";
import { ReactComponent as Close } from "../../../assets/images/close.svg";
import "@fortawesome/fontawesome-free/css/all.css";

const Container = styled.div`
  width: 85%;
  font-size: 0.8rem;
  padding: 10px;
  margin: 5px auto;
  color: var(--twoyak-black);
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const FlexStart = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

const Rating = styled(StyledRating)`
  margin: 0 -2px;
  font-size: 0.5rem;
  .custom {
    margin: 0 2px;
  }
`;

const CustomRatingText = styled(RatingText)`
  font-size: 0.5rem;
  margin-left: 0.4rem;
  font-weight: normal;
`;

const Bold = styled.div`
  font-weight: bold;
  margin-bottom: 0.65rem;
`;

const EditIcon = styled.i`
  margin-right: 10px;
  color: var(--twoyak-black);
`;

const DrugReview = ({ review, deleteReview, updateButton }) => {
  return (
    <Container>
      {/* <Flex>
        {review.user_email && (
          <>
            <div>{review.user_email}</div>
            <SpaceSpan>|</SpaceSpan>
          </>
        )}
        <div>{review.age}</div>
        {review.sex && (
          <>
            <SpaceSpan>|</SpaceSpan>{" "}
            <div>{review.sex === true ? "남" : "여"}</div>
          </>
        )}
      </Flex> */}
      <Flex>
        <FlexStart>
          <Rating
            emptySymbol="fas fa-circle  custom"
            fullSymbol="fas fa-circle  custom full"
            initialRating={review.efficacy}
            readonly
          />
          <CustomRatingText>{review.efficacy.toFixed(1)}</CustomRatingText>
        </FlexStart>
        <FlexStart>
          <EditIcon
            className="fas fa-pencil-alt"
            onClick={() => updateButton(review)}
          />
          <Close onClick={() => deleteReview(review.id)} />
        </FlexStart>
      </Flex>
      <Bold>
        이상반응:{" "}
        {review.adverse_effects && review.adverse_effects.length > 0
          ? review.adverse_effects.map(effect => effect.symptom_name).join(", ")
          : "없음"}
      </Bold>
      <div>{review.body}</div>
    </Container>
  );
};

export default DrugReview;
