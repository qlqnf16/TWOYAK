import React, { useState, useContext } from "react";
import axios from "../../apis";
import { AuthContext } from "../../contexts/AuthStore";
import styled from "styled-components";

import Modal from "../UI/Modal";
import "@fortawesome/fontawesome-free/css/all.css";
import close from "../../assets/images/close.svg";
import medIcon from "../../assets/images/(white)med-icon.svg";
import { BasicButton } from "../UI/SharedStyles";

const DiseasesContainer = styled.div`
  padding: 17px;
`;

export const Header = styled.div`
  width: 100%;
  font-size: 0.875rem;
  font-weight: 800;
  color: #474747;
  margin-bottom: 1.125rem;
  display: flex;
  align-items: center;
`;

export const Contents = styled(Header)`
  opacity: 0.6;
  margin-bottom: 1.125rem;
  align-items: center;
`;

export const ContentDot = styled.div`
  color: var(--twoyak-blue);
  font-size: 0.375rem;
  margin-right: 0.4375rem;
`;

export const CloseImg = styled.img`
  margin-left: 0.4375rem;
`;

export const ModalContents = styled.div`
  height: 14.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ModalMessage = styled.div`
  width: 12.75rem;
  font-size: 0.875rem;
  font-weight: 800;
  color: #474747;
  margin-bottom: 38px;
`;

export const ButtonArea = styled.div`
  width: 100%;
`;

const PostToPastDiseasesButton = styled(BasicButton)`
  width: 60%;
  height: 3rem;
  text-align: center;
`;

const DeleteDiseaseButton = styled(BasicButton)`
  width: 40%;
  height: 3rem;
  opacity: 0.3;
  text-align: center;
`;

function DiseasesAndFamilyMedHis({ medHistory, historyChange }) {
  const [modalShow, setModalShow] = useState(false);
  const [diseaseNameDeleted, setDiseaseNameDeleted] = useState(null);
  const [diseaseIdDeleted, setDiseaseIdDeleted] = useState(null);

  const { state } = useContext(AuthContext);

  const toggleDeleteDiseaseHandler = (name, id) => {
    if (name && id) {
      setDiseaseNameDeleted(name);
      setDiseaseIdDeleted(id);
    } else {
      setDiseaseNameDeleted(null);
      setDiseaseIdDeleted(null);
    }
    setModalShow(!modalShow);
  };

  const deleteFamilyMedHistoriesHandler = () => {
    axios({
      method: "DELETE",
      url: `/user/${state.userId}/family_med_histories/${diseaseIdDeleted}`,
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    }).then(response => console.log(response.data));
    setModalShow(!modalShow);
    historyChange(state.subUserIndex);
  };

  const deleteCurrentDiseaseModalContent = (
    <ModalContents>
      <ModalMessage>
        {diseaseNameDeleted} 을 가족력에서 삭제하시겠습니까?
      </ModalMessage>
      <ButtonArea>
        <PostToPastDiseasesButton onClick={() => toggleDeleteDiseaseHandler()}>
          아니오
        </PostToPastDiseasesButton>
        <DeleteDiseaseButton onClick={() => deleteFamilyMedHistoriesHandler()}>
          삭제
        </DeleteDiseaseButton>
      </ButtonArea>
    </ModalContents>
  );

  let medHistoryContents = null;
  if (medHistory) {
    medHistoryContents = medHistory.map((i, k) => (
      <Contents key={k}>
        <ContentDot className="fas fa-circle" />
        {i.name}
        <CloseImg
          src={close}
          onClick={() => toggleDeleteDiseaseHandler(i.name, i.id)}
        />
      </Contents>
    ));
  }

  return (
    <DiseasesContainer>
      <Header>가족력</Header>
      {medHistoryContents}
      {modalShow ? (
        <Modal
          modalOff={() => toggleDeleteDiseaseHandler(null, null)}
          img={medIcon}
          title="투약"
          content={deleteCurrentDiseaseModalContent}
        />
      ) : null}
    </DiseasesContainer>
  );
}

export default DiseasesAndFamilyMedHis;
