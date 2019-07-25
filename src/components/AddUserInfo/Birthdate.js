import React, { useState } from "react";
import styled from "styled-components";

import { BasicInput } from "../UI/SharedStyles";
import Modal from "../UI/Modal";
import DatePicker from "../UI/DatePicker";
import medIcon from "../../assets/images/(white)med-icon.svg";

const BirthDateSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
`;

const InfoCategory = styled.div`
  width: auto;
  font-size: 0.875rem;
  font-weight: 800;
  height: 1rem;
  opacity: 0.6;
  color: var(--twoyak-blue);
`;

const DateInput = styled(BasicInput)`
  width: 11.0625rem;
  height: 2.0625rem;
  text-align: center;
  margin-top: 0.6875rem;
`;

function BirthdayInfo({ value, getBirthDate }) {
  const [birthDateModalShow, setBirthDateModlaShow] = useState(false);

  const toggleBirthDateModalHandler = () => {
    setBirthDateModlaShow(!birthDateModalShow);
  };

  const getDate = date => {
    getBirthDate(date);
  };

  return (
    <BirthDateSelectionContainer>
      <InfoCategory>생년월일</InfoCategory>
      <DateInput
        type="text"
        placeholder="터치하여 생년월일 입력"
        value={value}
        onClick={() => toggleBirthDateModalHandler()}
        readOnly
      />
      {birthDateModalShow ? (
        <Modal
          modalOff={() => toggleBirthDateModalHandler()}
          img={medIcon}
          title="생년월일"
          content={
            <DatePicker
              selectedDate={value}
              getDate={date => getDate(date)}
              modalOff={() => toggleBirthDateModalHandler()}
            />
          }
        />
      ) : null}
    </BirthDateSelectionContainer>
  );
}

export default BirthdayInfo;
