import React from "react";
import {
  Card,
  Line,
  BulletText,
  FlexDiv,
  BasicText
} from "../../UI/SharedStyles";
import styled from "styled-components";

const Flex = styled(FlexDiv)`
  justify-content: space-between;
  margin: 1rem 0;
`;

const PastCard = styled(Card)`
  padding: 1rem;
`;

const DrugsContainer = styled.div`
  margin-top: -1rem;
`;

const Text = styled(BasicText)`
  opacity: 1;
  font-size: 0.69rem;
  font-weight: normal;
  margin-left: 0.8rem;
`;

const DiseaseName = styled.div`
  margin: 1.6rem 0 -0.5rem 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--twoyak-black);
`

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
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 0.68rem;
  & p {
    color: var(--twoyak-black);
    font-size: 0.875rem;
  }
`;

const PastDrug = ({ dateArray, monthCategory, modalOn }) => {
  const diseases = Object.keys(monthCategory)
  const drugs = diseases.map(disease => {
    return (
      <>
        <DiseaseName>{disease}</DiseaseName>
        {monthCategory[disease].map(drug => (
          <Flex key={drug.name}>
            <Bullet>
              <p onClick={() => { modalOn(drug.id) }} >
                {drug.name}
              </p>
            </Bullet>
            <Text>
              {drug.from ? drug.from.slice(5).split("-").join("/") : null}
              {` ~ `}
              {drug.to ? drug.to.slice(5).split("-").join("/") : null}
            </Text>
          </Flex>
        ))}
      </>
    )
  })

  return (
    <PastCard>
      {dateArray[0] !== "Invalid date" ? (
        <DateContainer>
          <Year>{dateArray[0]}년</Year>
          <div>{parseInt(dateArray[1])}월</div>
        </DateContainer>
      ) : (
          <DateContainer>기록하지 않음</DateContainer>
        )}

      <Line />
      <DrugsContainer>
        {drugs}
      </DrugsContainer>
    </PastCard>
  );
};

export default PastDrug;
