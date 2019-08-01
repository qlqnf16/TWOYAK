import React from "react";
import styled from "styled-components";
import { StyledRating, RatingText, BasicText } from "../../UI/SharedStyles";
import { ReactComponent as Edit } from "../../../assets/images/edit-review.svg";
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
  margin: 0 0.4rem;
  font-weight: normal;
`;

const Bold = styled.div`
  font-weight: bold;
  margin-bottom: 0.65rem;
`;

const EditIcon = styled(Edit)`
  margin-right: 10px;
  color: var(--twoyak-black);
`;

const DrugReview = ({ my, review, deleteReview, updateButton }) => {
  return (
    <Container>
      <Flex>
        <FlexStart>
          <Rating
            emptySymbol="fas fa-circle  custom"
            fullSymbol="fas fa-circle  custom full"
            initialRating={review.efficacy}
            readonly
          />
          <CustomRatingText>{review.efficacy.toFixed(1)}</CustomRatingText>
          {!my && (
            <BasicText size="0.7rem" bold="normal">
              {review.age} {review.sex === true ? "남" : "여"}
            </BasicText>
          )}
        </FlexStart>
        {my && updateButton && (
          <FlexStart>
            <EditIcon onClick={() => updateButton(review)} />
            <Close onClick={() => deleteReview(review.id)} />
          </FlexStart>
        )}
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
