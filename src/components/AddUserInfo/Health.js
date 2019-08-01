import React from "react";
import styled from "styled-components";

const HealthSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
`;

const Category = styled.div`
  width: auto;
  font-size: 0.875rem;
  font-weight: 800;
  height: 1rem;
  opacity: 0.6;
  color: var(--twoyak-blue);
`;

const Description = styled.div`
  font-size: 0.75rem;
  opacity: 0.8;
  margin-top: 0.6875rem;
  color: #757575;
`;

const SelectArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.6875rem;
  width: 94px;
`;

const SelectCircle = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border: solid 1px #b1e2ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  color: #757575;
`;

function Health({ drink, smoke, caffeine, toggleHandle }) {
  return (
    <HealthSelectionContainer>
      <Category>건강정보</Category>
      <Description>평소에 술을 많이 드시나요?</Description>
      <SelectArea>
        <SelectCircle
          onClick={() => toggleHandle("drink", true)}
          style={
            drink
              ? { backgroundColor: "var(--twoyak-blue)", color: "#ffffff" }
              : { backgroundColor: "transparent" }
          }
        >
          YES
        </SelectCircle>
        <SelectCircle
          onClick={() => toggleHandle("drink", false)}
          style={
            drink === false
              ? { backgroundColor: "var(--twoyak-blue)", color: "#ffffff" }
              : { backgroundColor: "transparent" }
          }
        >
          NO
        </SelectCircle>
      </SelectArea>
      <Description>흡연자이신가요?</Description>
      <SelectArea>
        <SelectCircle
          onClick={() => toggleHandle("smoke", true)}
          style={
            smoke
              ? { backgroundColor: "var(--twoyak-blue)", color: "#ffffff" }
              : { backgroundColor: "transparent" }
          }
        >
          YES
        </SelectCircle>
        <SelectCircle
          onClick={() => toggleHandle("smoke", false)}
          style={
            smoke === false
              ? { backgroundColor: "var(--twoyak-blue)", color: "#ffffff" }
              : { backgroundColor: "transparent" }
          }
        >
          NO
        </SelectCircle>
      </SelectArea>
      <Description>카페인 음료를 많이 섭취하시나요?</Description>
      <SelectArea>
        <SelectCircle
          onClick={() => toggleHandle("caffeine", true)}
          style={
            caffeine
              ? { backgroundColor: "var(--twoyak-blue)", color: "#ffffff" }
              : { backgroundColor: "transparent" }
          }
        >
          YES
        </SelectCircle>
        <SelectCircle
          onClick={() => toggleHandle("caffeine", false)}
          style={
            caffeine === false
              ? { backgroundColor: "var(--twoyak-blue)", color: "#ffffff" }
              : { backgroundColor: "transparent" }
          }
        >
          NO
        </SelectCircle>
      </SelectArea>
    </HealthSelectionContainer>
  );
}

export default Health;
