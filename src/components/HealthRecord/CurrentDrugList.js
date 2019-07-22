import React, { useState } from "react";
import CurrentDrug from "./CurrentDrug";
import AddCard from "./AddCard";
import { WhiteButton, Line, Card } from "../UI/SharedStyles";
import medIcon from "../../assets/images/(white)med-icon.svg";
import Modal from "../UI/Modal";
import styled from "styled-components";
import InteractionNotice from "./InteractionNotice";

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

const ModalContainer = styled.div`
  text-align: center;
`;

const CurrentDrugList = ({
  currentDrugs,
  durInfo,
  loadingHandler,
  drugToPast,
  deleteDrug
}) => {
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
                  <ModalContainer key={drug.id}>
                    <Item>{drug.drug_name.split("(")[0]}</Item>
                    <Duration>
                      {drug.from}
                      {drug.to && ` ~ ${drug.to}`}
                    </Duration>
                    <Line />
                  </ModalContainer>
                );
              })}
            </ContentContainer>
          }
        />
      )}
      {durInfo && (
        <Card>
          {durInfo.interactions && (
            <InteractionNotice
              durName="interactions"
              durText="다음 약물을 함께 드시면 안 돼요!"
              durDetail={durInfo.interactions}
            />
          )}
          {durInfo.same_ingr && (
            <InteractionNotice
              durText="다음 약물은 같은 성분의 약이에요!"
              durDetail={durInfo.same_ingr}
            />
          )}
          {durInfo.duplicate && (
            <InteractionNotice
              durText={[
                "다음 약물은 효능이 같은 약물로,",
                <br />,
                "함께 복용시 부작용이 발생할 수 있어요",
                <br />,
                "주의하세요!"
              ]}
              durDetail={durInfo.duplicate}
            />
          )}
        </Card>
      )}

      {currentDrugs.map(drug => {
        return (
          <CurrentDrug
            drug={drug}
            key={drug.id}
            review={drug.my_review}
            loadingHandler={loadingHandler}
            drugToPast={drugToPast}
            deleteDrug={deleteDrug}
          />
        );
      })}
      <AddCard text="복용중이신 약을 추가해보세요!" />
    </>
  );
};

export default CurrentDrugList;
