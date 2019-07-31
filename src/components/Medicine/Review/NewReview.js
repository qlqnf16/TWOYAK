import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AutoSuggestion from "../../Util/AutoSuggestion";
import RemovableButton from "../../UI/RemovableButton";
import {
  BasicButton,
  FlexForm,
  FlexDiv,
  StyledRating,
  RatingText,
  AutosuggestStyleWrapper
} from "../../UI/SharedStyles";
import medIcon from "../../../assets/images/(white)med-icon.svg";
import "@fortawesome/fontawesome-free/css/all.css";
import Modal from "../../UI/Modal";

const Titles = styled.div`
  font-size: 0.875rem;
  font-weight: 800;
  color: #474747;
  margin-top: 1.82rem;
  margin-bottom: 0.625rem;
`;

const Suggestion = styled.div`
  & .react-autosuggest__input {
    font-size: 0.9rem;
    height: 26px;
  }

  & .react-autosuggest__suggestions-container--open {
    width: 100%;
    top: 25px;
  }
`;

const AddButton = styled(BasicButton)`
  font-size: 0.9rem;
  background-color: #a0a0a0;
`;

const Form = styled(FlexForm)`
  margin: 0.3rem 0;
`;

const CustomTextarea = styled.textarea`
  width: 100%;
  height: 4.825rem;
  resize: none;
  font-size: 0.7rem;
  color: var(--twoyak-black);
  opacity: 0.7;
  padding: 1.25rem;
  border-radius: 1.5rem;
  border: solid 1px #00a2ff;
`;

const SubmitButton = styled(BasicButton)`
  display: block;
  margin: 3.25rem auto 2.43rem auto;
`;

const NewReview = React.memo(({ reviewSubmit, review, modalOff }) => {
  const [efficacy, setEfficacy] = useState(0);
  const [adverseEffects, setAdverseEffects] = useState([]);
  const [detail, setDetail] = useState();

  // 리뷰 수정 시
  useEffect(() => {
    if (review) {
      setEfficacy(review.efficacy);
      setDetail(review.body);
      setAdverseEffects(review.adverse_effects);
    }
  }, [review]);

  const adverseEffectInputChange = value => {
    if (adverseEffects.indexOf(value) === -1)
      setAdverseEffects(adverseEffects.concat(value));
  };

  const adverseEffectSubmit = event => {
    event.preventDefault();
  };

  const deleteAdverseEffect = content => {
    setAdverseEffects(adverseEffects.filter(effect => effect.id !== content));
  };

  const detailInputChange = event => {
    setDetail(event.target.value);
  };

  const finalReviewSubmit = event => {
    event.preventDefault();
    const adverseEffectIds = adverseEffects.map(effect => effect.id);
    if (review)
      reviewSubmit("put", efficacy, adverseEffectIds, detail, review.id);
    else reviewSubmit("post", efficacy, adverseEffectIds, detail, null);

    // clear
    setEfficacy(0);
    setAdverseEffects([]);
    setDetail();
  };

  return (
    <Modal
      modalOff={modalOff}
      img={medIcon}
      imgalt="med-icon"
      title="리뷰 작성"
      content={
        <>
          <Titles>평점</Titles>
          <FlexDiv>
            <StyledRating
              emptySymbol="fas fa-circle fa-2x custom"
              fullSymbol="fas fa-circle fa-2x custom full"
              fractions={2}
              onChange={setEfficacy}
              initialRating={efficacy}
            />
            <RatingText>{efficacy}</RatingText>
          </FlexDiv>
          <Titles>복용 후 이상반응이 있었나요?</Titles>
          <Form onSubmit={adverseEffectSubmit}>
            <AutosuggestStyleWrapper>
              <AutoSuggestion
                search="adverse_effect"
                searchKey="symptom_name"
                placeholderProp="느끼신 증상을 입력하세요"
                inputChange={adverseEffectInputChange}
              />
            </AutosuggestStyleWrapper>
          </Form>
          {adverseEffects &&
            adverseEffects.map(effect => (
              <RemovableButton
                key={effect.id}
                effect={effect}
                deleteAdverseEffect={deleteAdverseEffect}
              />
            ))}
          <Titles>리뷰 내용</Titles>

          <CustomTextarea
            onChange={detailInputChange}
            placeholder="많은 사람들이 참고할 만한 의약품 리뷰를 남겨주세요"
            value={detail ? detail : ""}
          />
          <SubmitButton onClick={finalReviewSubmit}>완료</SubmitButton>
        </>
      }
    />
  );
});

export default NewReview;
