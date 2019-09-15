import React, { useState } from "react";
import styled from "styled-components";

import { BasicInput } from "../UI/SharedStyles";
import moment from "moment";
import DatePicker from "react-mobile-datepicker";

const BirthDateSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const StyledDatePicker = styled(DatePicker)`
  * .datepicker .datepicker-header {
    text-align: center;
  }
`;

function BirthdayInfo({ value, getBirthDate, backgroundScroll }) {
  const [birthDateModalShow, setBirthDateModlaShow] = useState(false);
  const [backgroundScrollable, setBackgroundScrollable] = useState(false);

  const toggleBirthDateModalHandler = () => {
    setBirthDateModlaShow(!birthDateModalShow);
    setBackgroundScrollable(!backgroundScrollable);
    backgroundScroll(backgroundScrollable);
  };

  const getDate = date => {
    getBirthDate(moment(date).format("YYYY-MM-DD"));
    toggleBirthDateModalHandler();
  };

  const dateConfig = {
    year: {
      format: "YYYY",
      caption: "년",
      step: 1
    },
    month: {
      format: "MM",
      caption: "월",
      step: 1
    },
    date: {
      format: "DD",
      caption: "일",
      step: 1
    }
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
      <StyledDatePicker
        style={{ textAlign: "center" }}
        dateConfig={dateConfig}
        value={new Date(value)}
        theme="ios"
        isOpen={birthDateModalShow}
        onSelect={date => getDate(date)}
        onCancel={() => toggleBirthDateModalHandler()}
        confirmText="선택"
        cancelText="취소"
      />
    </BirthDateSelectionContainer>
  );
}

export default BirthdayInfo;
