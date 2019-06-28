import React, { useState } from "react";
import Slider from "react-input-slider";
import styled from "styled-components";

const Container = styled.form`
  width: 100%;
  margin: 10px 0;
  border: 1px solid #dbdbdb
  padding: 10px;
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

const NewReview = () => {
  const [efficacy, setEfficacy] = useState(3);

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
      <CustomTextarea placeholder="많은 사람들이 참고할 만한 의약품 리뷰를 남겨주세요" />
    </Container>
  );
};

export default NewReview;
