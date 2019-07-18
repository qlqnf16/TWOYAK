import React, { useState } from "react";
import Modal from "../../UI/Modal";
import AutoSuggestion from "../../Util/AutoSuggestion";
import DatePicker from "../../UI/DatePicker";

import styled from "styled-components";
import { BasicText, BasicButton } from "../../UI/SharedStyles";
import close from "../../../assets/images/(white)close.svg";

const Container = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 4rem;
  border-radius: 1.5rem;
  border: solid 1px var(--twoyak-blue);
  padding: 1rem;
  resize: none;
  margin-top: 1rem;
`;

const Button = styled(BasicButton)`
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const RemovableButton = styled(BasicButton)`
  font-size: 0.75rem;
  opacity: 0.7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 0.7rem;
`;

const RemoveIcon = styled.img`
  width: 0.7rem;
  margin-left: 0.6rem;
`;

const AddModal = ({ additionalModalToggle }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [diseases, setDiseases] = useState([]);

  const diseasesInputChange = value => {
    if (diseases.indexOf(value) === -1) setDiseases(diseases.concat(value));
  };

  const removeDiseaseHandler = id => {
    setDiseases(diseases.filter(disease => disease.id !== id));
  };

  return (
    <Modal
      title="복용 목록에 추가"
      content={
        <Container>
          <BasicText>질병명</BasicText>
          <AutoSuggestion
            search="disease"
            placeholderProp={"왜 이 약을 복용하시나요?"}
            searchKey="name"
            inputChange={diseasesInputChange}
          />
          {diseases.length > 0 &&
            diseases.map(disease => (
              <RemovableButton key={disease.id}>
                {disease.name}
                <RemoveIcon
                  src={close}
                  alt="close-button"
                  onClick={() => {
                    removeDiseaseHandler(disease.id);
                  }}
                />
              </RemovableButton>
            ))}
          {showDetail ? (
            <div
              onClick={() => {
                setShowDetail(!showDetail);
              }}
            >
              접기
            </div>
          ) : (
            <div
              onClick={() => {
                setShowDetail(!showDetail);
              }}
            >
              상세 정보 추가하기
            </div>
          )}
          {showDetail && (
            <>
              {" "}
              <BasicText>기간</BasicText>
              {/* <DatePicker /> */}
              <BasicText>메모</BasicText>
              <TextArea />
            </>
          )}

          <Button>완료</Button>
        </Container>
      }
      modalOff={() => {
        additionalModalToggle("add");
      }}
    />
  );
};

export default AddModal;
