import React, { useState } from "react";
import CurrentDrug from "./CurrentDrug";
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
  padding: 1rem;
`;

const ContentContainer = styled.div`
  height: 65vh;
  overflow: scroll;
`;

const CurrentDrugList = ({ currentDrugs, reviews, loadingHandler }) => {
  const [show, setShow] = useState(true);

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
                  <div key={drug.id}>
                    <Item>{drug.name}</Item>
                    <Line />
                  </div>
                );
              })}
            </ContentContainer>
          }
        />
      )}
      {currentDrugs.map(drug => {
        const review = reviews.find(review => review.drug_id === drug.id);
        return (
          <CurrentDrug
            drug={drug}
            key={drug.id}
            review={review}
            loadingHandler={loadingHandler}
          />
        );
      })}
    </>
  );
};

export default CurrentDrugList;
