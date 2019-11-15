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
import CurrentModalDrug from "./CurrentModalDrug";

const ContentContainer = styled.div`
  max-height: 65vh;
  overflow: scroll;
  padding: 1rem 0;
  text-align: center;
`;

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

const Text = styled(BasicText)`
  margin: 0 0.5rem;
`

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
          wide
          img={medIcon}
          imgalt="med-icon"
          title="복용 중인 약 목록"
          modalOff={toggleModal}
          content={
            <ContentContainer>

              {(subUserInfo.meta.family_med_histories || subUserInfo.attributes.smoke ||
                subUserInfo.attributes.caffeine ||
                subUserInfo.attributes.drink) && (
                  <>

                    {subUserInfo.meta.family_med_histories && (<>
                      <BulletText><p>가족력: {subUserInfo.meta.family_med_histories.map(disease => (
                        disease.data.attributes.name
                      )).join(", ")} </p></BulletText>

                      {/* <Item>가족력</Item>
                      {subUserInfo.meta.family_med_histories.map(disease => (
                        <Text>{disease.data.attributes.name}</Text>
                      ))} */}

                    </>)}

                    {subUserInfo.attributes.smoke && (
                      <BulletText>
                        <p>흡연자입니다</p>
                      </BulletText>
                    )}
                    {subUserInfo.attributes.drink && (
                      <BulletText>
                        <p>음주를 많이 해요</p>
                      </BulletText>
                    )}
                    {subUserInfo.attributes.caffeine && (
                      <BulletText>
                        <p>카페인 섭취를 많이 해요</p>
                      </BulletText>
                    )}

                    <Line />
                  </>
                )}

              {/* {(subUserInfo.attributes.smoke ||
                subUserInfo.attributes.caffeine ||
                subUserInfo.attributes.drink) && (
                  <>
                    {" "}
                    {subUserInfo.attributes.smoke && (
                      <BulletText>
                        <p>흡연자입니다</p>
                      </BulletText>
                    )}
                    {subUserInfo.attributes.drink && (
                      <BulletText>
                        <p>음주를 많이 해요</p>
                      </BulletText>
                    )}
                    {subUserInfo.attributes.caffeine && (
                      <BulletText>
                        <p>카페인 섭취를 많이 해요</p>
                      </BulletText>
                    )}
                    <Line />
                  </>
                )} */}

              {currentDrugs.map(drug => <CurrentModalDrug drug={drug} />)}
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
