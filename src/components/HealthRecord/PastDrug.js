import React from "react";
import { Card, Line } from "../UI/SharedStyles";
import styled from "styled-components";

const PastCard = styled(Card)`
  padding: 1rem;
`;

const DateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  font-weight: 800;
  font-size: 1.2rem;
  color: var(--twoyak-black);
  margin-bottom: -10px;
`;

const Year = styled.div`
  font-size: 0.6rem;
  margin-right: 0.3rem;
`;

const PastDrug = ({ dateArray, monthCategory }) => {
  return (
    <PastCard>
      <DateContainer>
        <Year>{dateArray[0]}년</Year>
        <div>{parseInt(dateArray[1])}월</div>
      </DateContainer>
      <Line />
      <div>
        {monthCategory.map(drug => (
          <div key={drug.name}>{drug.name}</div>
        ))}
      </div>
    </PastCard>
  );
};

export default PastDrug;
