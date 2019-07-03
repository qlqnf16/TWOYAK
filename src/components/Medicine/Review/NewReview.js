import React, { useState, useEffect } from "react";
import Rating from "react-rating";

import styled from "styled-components";
import AutoSuggestion from "../../Util/AutoSuggestion";
import RemovableButton from "../../UI/RemovableButton";
import { BasicButton, FlexForm } from "../../UI/SharedStyles";

const Container = styled.div`
  width: 100%;
  margin: 10px 0;
  border: 1px solid #dbdbdb;
  padding: 10px;
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
  height: 60px;
  resize: none;
  margin-top: 1rem;
  font-size: 1rem;
  color: #333;
  box-sizing: border-box;
  padding: 7px;
  border: 1px solid #c1c1c1;
`;

const SubmitButton = styled(BasicButton)`
  font-size: 1.2rem;
  padding: 0.4rem 1rem;
  margin-top: 1rem;
`;

const NewReview = React.memo(({ reviewSubmit, review }) => {
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
    <Container>
      <div>리뷰를 남겨주세요</div>
      <div>효과는 어땠나요?</div>
      <Rating fractions={2} onChange={setEfficacy} initialRating={efficacy} />
      <div>복용 후 이상반응이 있었나요?</div>
      <Form onSubmit={adverseEffectSubmit}>
        <Suggestion>
          <AutoSuggestion
            search="adverse_effect"
            searchKey="symptom_name"
            placeholderProp="느끼신 증상을 입력하세요"
            inputChange={adverseEffectInputChange}
          />
        </Suggestion>
        <AddButton type="submit">추가</AddButton>
      </Form>
      {adverseEffects.length > 0 &&
        adverseEffects.map(effect => (
          <RemovableButton
            key={effect.id}
            effect={effect}
            deleteAdverseEffect={deleteAdverseEffect}
          />
        ))}

      <CustomTextarea
        onChange={detailInputChange}
        placeholder="많은 사람들이 참고할 만한 의약품 리뷰를 남겨주세요"
        value={detail ? detail : ""}
      />
      <SubmitButton onClick={finalReviewSubmit}>
        {review ? "수정하기" : "리뷰 등록하기"}
      </SubmitButton>
    </Container>
  );
});

export default NewReview;
