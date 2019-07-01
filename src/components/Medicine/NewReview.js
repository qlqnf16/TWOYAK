import React, { useState } from "react";
import Slider from "react-input-slider";
import styled from "styled-components";
import AutoSuggestion from "../Util/AutoSuggestion";
import RemovableButton from "../UI/RemovableButton";
import { BasicButton, FlexForm } from "../UI/SharedStyles";

const Container = styled.div`
  width: 100%;
  margin: 10px 0;
  border: 1px solid #dbdbdb
  padding: 10px;
`;

const Suggestion = styled.div`
  & .react-autosuggest__input {
    width: 200px;
    font-size: 0.9rem;
    height: 20px;
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
`;

const SubmitButton = styled(BasicButton)`
  font-size: 1.2rem;
  padding: 0.4rem 1rem;
  margin-top: 1rem;
`;

const NewReview = ({ reviewSubmit }) => {
  const [efficacy, setEfficacy] = useState(3);
  const [adverseEffects, setAdverseEffects] = useState([]);
  const [detail, setDetail] = useState();

  const effectInputChange = value => {
    if (adverseEffects.indexOf(value) === -1)
      setAdverseEffects(adverseEffects.concat(value));
  };

  const effectFormSubmit = e => {
    e.preventDefault();
  };

  const deleteEffect = content => {
    setAdverseEffects(adverseEffects.filter(effect => effect.id !== content));
  };

  const detailInputChange = e => {
    setDetail(e.target.value);
  };

  const finalSubmit = e => {
    e.preventDefault();
    const adverseEffectIds = adverseEffects.map(effect => effect.id);
    reviewSubmit(efficacy, adverseEffectIds, detail);
  };

  return (
    <Container>
      <div>리뷰를 남겨주세요</div>
      <div>효과는 어땠나요? {efficacy}</div>
      <Slider
        axis="x"
        xstep={0.5}
        xmin={1}
        xmax={5}
        x={efficacy}
        onChange={({ x }) => setEfficacy(x)}
      />
      <div>복용 후 이상반응이 있었나요?</div>
      <Form onSubmit={effectFormSubmit}>
        <Suggestion>
          <AutoSuggestion
            search="adverse_effect"
            searchKey="symptom_name"
            placeholderProp="느끼신 증상을 입력하세요"
            inputChange={effectInputChange}
          />
        </Suggestion>
        <AddButton type="submit">추가</AddButton>
      </Form>
      {adverseEffects.length > 0 &&
        adverseEffects.map(effect => (
          <RemovableButton
            key={effect.id}
            effect={effect}
            deleteEffect={deleteEffect}
          />
        ))}

      <CustomTextarea
        onChange={detailInputChange}
        placeholder="많은 사람들이 참고할 만한 의약품 리뷰를 남겨주세요"
      />
      <SubmitButton onClick={finalSubmit}>리뷰 등록하기</SubmitButton>
    </Container>
  );
};

export default NewReview;
