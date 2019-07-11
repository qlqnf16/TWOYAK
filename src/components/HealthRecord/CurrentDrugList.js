import React, { useState } from "react";
import CurrentDrug from "./CurrentDrug";
import AddCard from "./AddCard";
import { WhiteButton, Line } from "../UI/SharedStyles";
import medIcon from "../../assets/images/(white)med-icon.svg";
import Modal from "../UI/Modal";
import styled from "styled-components";

const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--twoyak-black);
  font-size: 0.875rem;
  font-weight: 800;
  line-height: 1.5rem;
`;

const Duration = styled(Item)`
  opacity: 0.6;
  font-size: 0.75rem;
`;

const ContentContainer = styled.div`
  max-height: 65vh;
  overflow: scroll;
`;

const CurrentDrugList = ({ currentDrugs, loadingHandler, drugToPast }) => {
  const [show, setShow] = useState(false);

  const toggleModal = () => {
    setShow(!show);
  };

  return (
    <>
      <WhiteButton onClick={toggleModal}>약 이름 모아보기</WhiteButton>
      {show && (
        <Modal
          img={medIcon}
          imgalt="med-icon"
          title="복용 중인 약 목록"
          modalOff={toggleModal}
          content={
            <ContentContainer>
              {currentDrugs.map(drug => {
                return (
                  <div style={{ marginTop: "1.5rem" }} key={drug.id}>
                    <Item>{drug.drug_name}</Item>
                    <Duration>
                      {drug.from}
                      {drug.to && ` ~ ${drug.to}`}
                    </Duration>
                    <Line />
                  </div>
                );
              })}
            </ContentContainer>
          }
        />
      )}
      {currentDrugs.map(drug => {
        return (
          <CurrentDrug
            drug={drug}
            key={drug.id}
            review={drug.my_review}
            loadingHandler={loadingHandler}
            drugToPast={drugToPast}
          />
        );
      })}
      <AddCard text="복용중이신 약을 추가해보세요!" />
    </>
  );
};

export default CurrentDrugList;
