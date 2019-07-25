import React from "react";
import styled from "styled-components";

const SexSelectionContainer = styled.div`
  margin-top: 33px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 5rem;
  justify-content: space-evenly;
`;

const Category = styled.div`
  width: auto;
  font-size: 0.875rem;
  font-weight: 800;
  height: 1rem;
  opacity: 0.6;
  color: var(--twoyak-blue);
`;

const SelectArea = styled.div`
  margin-top: 11px;
  display: flex;
  justify-content: space-between;
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

function Sex({ sex, toggleHandle }) {
  return (
    <SexSelectionContainer>
      <Category>성별</Category>
      <SelectArea>
        <SelectCircle
          onClick={() => toggleHandle("sex", true)}
          style={
            sex
              ? { backgroundColor: "var(--twoyak-blue)", color: "#ffffff" }
              : { backgroundColor: "white" }
          }
        >
          남
        </SelectCircle>
        <SelectCircle
          onClick={() => toggleHandle("sex", false)}
          style={
            sex === false
              ? { backgroundColor: "var(--twoyak-blue)", color: "#ffffff" }
              : { backgroundColor: "white" }
          }
        >
          여
        </SelectCircle>
      </SelectArea>
    </SexSelectionContainer>
  );
}

export default Sex;
