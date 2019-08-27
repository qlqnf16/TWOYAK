import React from "react";
import styled from "styled-components";

import { EmptyCard, Divider } from "../UI/SharedStyles";
import Spinner from "../UI/Spinner";
import addDash from "../../assets/images/add-dash.svg";
import "@fortawesome/fontawesome-free/css/all.css";

const CurrentDrugsContainer = styled.div`
  margin-top: 1.3125rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.div`
  font-size: 1.125rem;
  font-weight: 800;
  margin-left: 0.5rem;
`;

const PressCard = styled(EmptyCard)`
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin: 1.5rem 0;
  width: 100%;
  border-width: 1px;
`;

const AddButton = styled.img`
  width: 2.25rem;
`;

const DrugsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 12px 6px;
  margin: 1.1rem 0;
`

const CurrentDrugsDiv = styled.div`
  display: flex;
  align-items: center;
  overflow:hidden;
`;

const ContentDot = styled.div`
  color: var(--twoyak-blue);
  font-size: 0.375rem;
  margin-right: 0.4375rem;
`;

const DrugName = styled.div`
  font-size: 0.75rem;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const HomeDivider = styled(Divider)`
  margin-top:1rem;
`;

const HomeContent = styled.div`
  margin-top: 2.125rem;
  display: flex;
`;

const MoreInfo = styled.div`
  font-size: 0.75rem;
  text-align: right;
  color: var(--twoyak-black);
`;

function CurrentDrugs({ currentDrugs, history, medIcon, userName, loading }) {
  const searchDrugHandler = drug_id => {
    history.push(`/medicine/${drug_id}`);
  };
  return (
    <CurrentDrugsContainer>
      <HeaderContainer>
        <div style={{ display: "flex" }}>
          <img src={medIcon} alt="med-icon" />
          <Header>{userName}님이 복용중인 약</Header>
        </div>
      </HeaderContainer>
      {loading ? (<Spinner />) : currentDrugs ? (
        <>
          <DrugsContainer>
            {currentDrugs.map((i, k) => (
              <CurrentDrugsDiv
                key={k}
                onClick={() => searchDrugHandler(i.attributes.current_drug_id)}
              >
                <ContentDot className="fas fa-circle" />
                <DrugName>{i.attributes.drug.data.attributes.name.split("(")[0]}</DrugName>
              </CurrentDrugsDiv>
            ))}
          </DrugsContainer>
          <MoreInfo onClick={() => history.push("/health-record")}>
            자세히 보기
      </MoreInfo></>)
        : (
          <PressCard onClick={() => history.push("/medicine")}>
            <AddButton src={addDash} />
          </PressCard>
        )}
      <HomeDivider />
      <HomeContent>
        <img src={medIcon} alt="med-icon" />
        <Header>투약이 추천하는 컨텐츠</Header>
      </HomeContent>
    </CurrentDrugsContainer>
  );
}

export default CurrentDrugs;
