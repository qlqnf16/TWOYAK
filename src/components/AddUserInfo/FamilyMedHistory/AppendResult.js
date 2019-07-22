import React, { useState, useContext } from "react";
import axios from "../../../apis";
import { AuthContext } from "../../../contexts/AuthStore";
import styled from "styled-components";
import SearchInput from "./SearchInput";
import closeIcon from "../../../assets/images/close.svg";

const StyleWrapper = styled.div`
  width: 15.5rem;
  margin-top: 2.8125rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Category = styled.div`
  width: auto;
  font-size: 0.875rem;
  font-weight: 800;
  height: 1rem;
  opacity: 0.6;
  color: var(--twoyak-blue);
`;

const DiseaseContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const DiseaseWrapper = styled.div`
  background-color: var(--twoyak-blue);
  opacity: 0.7;
  height: 1.875rem;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
`;

const DiseaseButton = styled.div`
  color: #ffffff;
  padding-right: 1rem;
  padding-left: 1rem;
`;

const Close = styled.img`
  width: 1rem;
  margin-right: 0.5rem;
`;

function AppendResult({ diseaseArray }) {
  const [familyMedHistories, setFamilyMedHistories] = useState([]);
  const { state } = useContext(AuthContext);

  // useState(() => {
  //   if (state.userId) {
  //     axios({
  //       method: "GET",
  //       url: `/user/${state.userId}/family_med_histories`,
  //       headers: {
  //         Authorization: state.token
  //       }
  //     }).then(response => {
  //       setFamilyMedHistories(response.data);
  //     });
  //   }
  // }, [state.userId]);

  const postDiseaseIdHandler = (method, suggestion) => {
    axios({
      method: method,
      url: `/user/${state.userId}/family_med_histories/${suggestion.id}`,
      headers: {
        Authorization: state.token
      }
    }).then(response => {
      switch (method) {
        case "POST":
          setFamilyMedHistories(response.data);
          break;
        case "DELETE":
          axios({
            method: "GET",
            url: `/user/${state.userId}/family_med_histories`,
            headers: {
              Authorization: state.token
            }
          }).then(response => {
            setFamilyMedHistories(response.data);
          });
          break;
        default:
      }
    });
  };

  return (
    <StyleWrapper>
      <Category>가족력이 있으시면 입력해주세요</Category>
      <SearchInput
        diseaseArray={diseaseArray}
        appendDiseaseId={suggestion => postDiseaseIdHandler("POST", suggestion)}
      />
      <DiseaseContainer>
        {familyMedHistories.map((i, k) => (
          <DiseaseWrapper key={k} style={{ display: "flex" }}>
            <DiseaseButton key={k}>{i.name}</DiseaseButton>
            <Close
              src={closeIcon}
              alt="erase-disease"
              onClick={() => postDiseaseIdHandler("DELETE", i)}
            />
          </DiseaseWrapper>
        ))}
      </DiseaseContainer>
    </StyleWrapper>
  );
}

export default AppendResult;
