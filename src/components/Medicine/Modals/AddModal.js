import React, { useState } from "react";
import Modal from "../../UI/Modal";
import AutoSuggestion from "../../Util/AutoSuggestion";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import moment from "moment";

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

const StyleWrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  position: relative;
  width: 100%;
  margin: 1rem 0;
   border-radius: 1.5rem;
    border: solid 1px var(--twoyak-blue);
  
& .react-autosuggest__container {
    height: 2rem;
    padding: 1rem;
   
    display: flex;
    align-items: center;
}

  & .react-autosuggest__input {
    width: 100%;
    padding: 1rem;
    height: 2rem;
    background: transparent;
    border: none
  }

  & .react-autosuggest__suggestions-container--open {
    width: 100%
    overflow: hidden;
    margin: 0;
    position: absolute;
    left: 0;
    top: 33px;
    background-color: white;
    border: 1px solid var(--twoyak-blue);
    z-index: 140;
  }

    & .react-autosuggest__suggestion {
    list-style-type: none;
    font-size: 0.7rem;
    margin-bottom: -1px;
    color: var(--twoyak-black);
    cursor: pointer;
    padding: 0.5rem;
    font-weight: bold;
  }
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

const FakeInput = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.5rem;
  border: solid 1px var(--twoyak-blue);
  padding: 1rem;
  margin: 1rem 0;
  font-size: 0.7rem;
  color: #474747;
`;

const RemoveIcon = styled.img`
  width: 0.7rem;
  margin-left: 0.6rem;
`;

const DatePickerContainer = styled.div`
  position: absolute;
  top: 9rem;
  left: -1rem;
  width: 110%;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding-bottom: 1rem;
`;

const StyledDateRange = styled(DateRange)`
  width: 100%;
  & .rdrMonth {
    width: 100%;
  }
`;

const AddModal = ({ additionalModalToggle, addCurrentDrug, drugId }) => {
  const [diseases, setDiseases] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [from, setFrom] = useState(moment());
  const [to, setTo] = useState(moment());

  const diseasesInputChange = value => {
    if (diseases.indexOf(value) === -1) setDiseases(diseases.concat(value));
  };

  const removeDiseaseHandler = id => {
    setDiseases(diseases.filter(disease => disease.id !== id));
  };

  const addDrug = () => {
    const diseaseIds = diseases.map(disease => disease.id);
    const formattedFrom = from.format("YYYY-MM-DD");
    const formattedTo = to.format("YYYY-MM-DD");
    addCurrentDrug(drugId, { diseaseIds, formattedFrom, formattedTo });
  };

  const selectionRange = {
    startDate: from,
    endDate: to,
    key: "selection"
  };

  const handleSelect = ranges => {
    setFrom(moment(ranges.selection.startDate));
    setTo(moment(ranges.selection.endDate));
  };

  return (
    <Modal
      title="복용 목록에 추가"
      content={
        <Container>
          <BasicText>왜 이 약을 드시나요?</BasicText>
          <StyleWrapper>
            <AutoSuggestion
              search="disease"
              placeholderProp={"질환명 입력"}
              searchKey="name"
              inputChange={diseasesInputChange}
            />
          </StyleWrapper>
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
          <>
            {" "}
            <BasicText>기간</BasicText>
            <FakeInput
              onClick={() => {
                setShowDatePicker(true);
              }}
            >
              {from.format("YYYY/MM/DD")} - {to.format("YYYY/MM/DD")}
            </FakeInput>
            {showDatePicker && (
              <DatePickerContainer>
                <StyledDateRange
                  months={1}
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                  showSelectionPreview={false}
                />
                <BasicButton
                  onClick={() => {
                    setShowDatePicker(false);
                  }}
                >
                  완료
                </BasicButton>
              </DatePickerContainer>
            )}
            <BasicText>메모</BasicText>
            <TextArea placeholder="ex) 하루에 언제 몇 알 씩 먹는지, 상세 복용 규칙 등을 기록해보세요" />
          </>

          <Button
            onClick={() => {
              addDrug();
            }}
          >
            완료
          </Button>
        </Container>
      }
      modalOff={() => {
        additionalModalToggle("add");
      }}
    />
  );
};

export default AddModal;
