import React, { useContext } from "react";

import styled from "styled-components";
import { StyledRating, RatingText, BasicText } from "../../UI/SharedStyles";
import { ReactComponent as Edit } from "../../../assets/images/edit-review.svg";
import { ReactComponent as Close } from "../../../assets/images/close.svg";
import { ReactComponent as Like } from "../../../assets/images/like.svg";
import "@fortawesome/fontawesome-free/css/all.css";
import { AuthContext } from "../../../contexts/AuthStore";

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
  text-align: left;
`;

const Text = styled.div`
  text-align: left;
`

const EditIcon = styled(Edit)`
  margin-right: 10px;
  color: var(--twoyak-black);
`;

const DrugReview = React.memo(({ review, deleteReview, deleteButton, updateButton, toggleLike }) => {
  const { state: authState } = useContext(AuthContext)
  let my = authState.userId === review.meta.user.id ? true : false;

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
          {my && updateButton && (
            <FlexStart>
              <EditIcon onClick={() => updateButton(review)} />
              <Close onClick={() => deleteButton(review)} />
            </FlexStart>
          )}
        </FlexStart>
        <FlexStart>
          <BasicText bold size="0.7rem">
            {review.attributes.drug_review_likes_count}
          </BasicText>
          <LikeIcon
            liked={review.meta.user.liked ? 1 : 0}
            onClick={() => {
              toggleLike(review.id);
            }}
          />
        </FlexStart>
      </Flex>
      <Bold>
        이상반응:{" "}
        {review.meta.adverse_effects && review.meta.adverse_effects.length > 0
          ? review.meta.adverse_effects.map(effect => effect.symptom_name).join(", ")
          : "없음"}
      </Bold>
      <Text>{review.attributes.body}</Text>
    </Container>
  );
});

export default DrugReview;
