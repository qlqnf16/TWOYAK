import React from "react";

import styled from "styled-components";
import { StyledRating, RatingText, BasicText } from "../../UI/SharedStyles";
import { ReactComponent as Edit } from "../../../assets/images/edit-review.svg";
import { ReactComponent as Close } from "../../../assets/images/close.svg";
import { ReactComponent as Like } from "../../../assets/images/like.svg";
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

const LikeIcon = styled(Like)`
  width: 1rem;
  margin-left: 0.5rem;
  opacity: ${props => (props.liked ? 1 : 0.6)};
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

const DrugReview = React.memo(({ my, review, deleteReview, updateButton, toggleLike }) => {
  return (
    <Container>
      <Flex>
        <FlexStart>
          <Rating
            emptySymbol="fas fa-circle  custom"
            fullSymbol="fas fa-circle  custom full"
            initialRating={review.attributes.efficacy}
            readonly
          />
          <CustomRatingText>{review.attributes.efficacy.toFixed(1)}</CustomRatingText>
          {!my && (
            <BasicText size="0.7rem" bold="normal">
              {review.meta.user.age} {review.meta.user.sex === true ? "남" : "여"}
            </BasicText>
          )}
        </FlexStart>
        <Flex>
          <BasicText bold size="0.7rem">
            {review.attributes.drug_review_likes_count}
          </BasicText>
          <LikeIcon
            liked={review.meta.user.liked ? 1 : 0}
            onClick={() => {
              toggleLike(review.id);
            }}
          />
        </Flex>
        {my && updateButton && (
          <FlexStart>
            <EditIcon onClick={() => updateButton(review)} />
            <Close onClick={() => deleteReview(review.attributes.id)} />
          </FlexStart>
        )}
      </Flex>
      <Bold>
        이상반응:{" "}
        {review.adverse_effects && review.adverse_effects.length > 0
          ? review.adverse_effects.map(effect => effect.symptom_name).join(", ")
          : "없음"}
      </Bold>
      <div>{review.attributes.body}</div>
    </Container>
  );
});

export default DrugReview;
