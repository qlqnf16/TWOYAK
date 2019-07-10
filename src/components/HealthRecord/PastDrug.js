import React from "react";
import { Card, Line, BulletText, FlexDiv, BasicText } from "../UI/SharedStyles";
import styled from "styled-components";

const Flex = styled(FlexDiv)`
  justify-content: space-between;
  margin: 1rem 0;
`;

const PastCard = styled(Card)`
  padding: 1rem;
`;

const Text = styled(BasicText)`
  opacity: 1;
  font-size: 0.69rem;
  font-weight: normal;
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

const Bullet = styled(BulletText)`
  & p {
    font-size: 0.875rem;
  }
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
          <Flex key={drug.name}>
            <Bullet>
              <p>{drug.name}</p>
            </Bullet>
            <Text>
              {drug.from
                .slice(5)
                .split("-")
                .join("/")}
              {` ~ `}
              {drug.to
                .slice(5)
                .split("-")
                .join("/")}
            </Text>
          </Flex>
        ))}
      </div>
    </PastCard>
  );
};

export default PastDrug;
