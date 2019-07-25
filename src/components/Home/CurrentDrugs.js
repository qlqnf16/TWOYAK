import React from "react";
import styled from "styled-components";

import { EmptyCard } from "../UI/SharedStyles";
import addDash from "../../assets/images/add-dash.svg";

const CurrentDrugsContainer = styled.div`
  margin-top: 1.3125rem;
`;

const HeaderContainer = styled.div`
  display: flex;
`;

const Header = styled.div`
  font-size: 1.125rem;
  font-weight: 800;
  margin-left: 0.5rem;
`;

const PressCard = styled(EmptyCard)`
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin: 1.5rem 0 0 0;
  width: 100%;
`;

const AddButton = styled.img`
  width: 2.25rem;
`;

function CurrentDrugs({ currentDrugs, history, medIcon, userName }) {
  const searchDrugHandler = drug_id => {
    history.push(`/medicine/${drug_id}`);
  };
  return (
    <CurrentDrugsContainer>
      <HeaderContainer>
        <img src={medIcon} alt="med-icon" />
        <Header>{userName}님이 복용중인 약</Header>
      </HeaderContainer>
      {currentDrugs ? (
        currentDrugs.map((i, k) => (
          <div onClick={() => searchDrugHandler(i.current_drug_id)}>
            {i.drug_name}
          </div>
        ))
      ) : (
        <PressCard>
          <AddButton src={addDash} />
        </PressCard>
      )}
    </CurrentDrugsContainer>
  );
}

export default CurrentDrugs;
