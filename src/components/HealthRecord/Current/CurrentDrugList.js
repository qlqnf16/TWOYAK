import React, { useState } from "react";
import CurrentDrug from "./CurrentDrug";
import {
  WhiteButton,
  Line,
  Card,
  BasicText,
  BulletText
} from "../../UI/SharedStyles";
import medIcon from "../../../assets/images/(white)med-icon.svg";
import Modal from "../../UI/Modals/Modal";
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
  padding: 1rem 0;
  text-align: center;
`;

const CurrentDrugList = ({
  currentDrugs,
  durInfo,
  loadingHandler,
  drugToPast,
  deleteDrug,
  subUserInfo
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
              {!subUserInfo.family_med_history ? (
                ""
              ) : (
                  <>
                    {" "}
                    <Item>가족력</Item>
                    {subUserInfo.family_med_history.map(disease => (
                      <BasicText>{disease.name}</BasicText>
                    ))}
                    <Line />
                  </>
                )}

              {(subUserInfo.smoke ||
                subUserInfo.caffeine ||
                subUserInfo.drink) && (
                  <>
                    {" "}
                    {subUserInfo.smoke && (
                      <BulletText>
                        <p>흡연자입니다</p>
                      </BulletText>
                    )}
                    {subUserInfo.drink && (
                      <BulletText>
                        <p>음주를 많이 해요</p>
                      </BulletText>
                    )}
                    {subUserInfo.caffeine && (
                      <BulletText>
                        <p>카페인 섭취를 많이 해요</p>
                      </BulletText>
                    )}
                    <Line />
                  </>
                )}

              {currentDrugs.map(drug => {
                return (
                  <div key={drug.id}>
                    <Item>{drug.attributes.drug.data.attributes.name.split("(")[0]}</Item>
                    <Duration>
                      {drug.attributes.from}
                      {drug.attributes.to && ` ~ ${drug.attributes.to}`}
                    </Duration>
                    <Line />
                  </div>
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
            review={drug.attributes.my_review}
            loadingHandler={loadingHandler}
            drugToPast={drugToPast}
            deleteDrug={deleteDrug}
          />
        );
      })}
    </>
  );
};

export default CurrentDrugList;
