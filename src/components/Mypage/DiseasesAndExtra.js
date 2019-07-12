import React, { useState } from 'react';
import styled from 'styled-components';

import Modal from "../UI/Modal";
import "@fortawesome/fontawesome-free/css/all.css";
import close from "../../assets/images/close.svg";
import medIcon from "../../assets/images/(white)med-icon.svg";
import { BasicButton } from "../../components/UI/SharedStyles";

const DiseasesAndExtraDrugsContainer = styled.div`
  padding: 17px;
`

export const Header = styled.div`
  width: 100%;
  font-size: 0.875rem;
  font-weight: 800;
  color: #474747;
  margin-bottom: 1.125rem;
  display: flex;
  align-items: center;
`

export const Contents = styled(Header)`
  opacity: 0.6;
  margin-bottom: 1.125rem;
  align-items: center;
`

export const ContentDot = styled.div`
  color: var(--twoyak-blue);
  font-size: 0.375rem;
  margin-right: 0.4375rem;
`

export const CloseImg = styled.img`
  margin-left: 0.4375rem;
`

export const ModalContents = styled.div`
  height: 14.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ModalMessage = styled.div`
  width: 12.75rem;
  font-size: 0.875rem;
  font-weight: 800;
  color: #474747;
  margin-bottom: 38px;
`

export const ButtonArea = styled.div`
  width: 100%;
`

const PostToPastDiseasesButton = styled(BasicButton)`
  width: 60%;
  height: 3rem;
`

const DeleteDiseaseButton = styled(BasicButton)`
  width: 40%;
  height: 3rem;
  opacity: 0.3;
`


function DiseasesAndExtra({
  currentDiseases
}) {
  const [modalShow, setModalShow] = useState(false);
  const [diseaseNameDeleted, setDiseaseNameDeleted] = useState(null);
  const [diseaseIdDeleted, setDiseaseIdDeleted] = useState(null);

  const toggleDeleteDiseaseHandler = (name, id) => {
    if ( name && id ) {
      setDiseaseNameDeleted(name);
      setDiseaseIdDeleted(id);
    } else {
      setDiseaseNameDeleted(null);
      setDiseaseIdDeleted(null);
    }
    setModalShow(!modalShow);
  }

  const deleteCurrentDiseaseModalContent = (
    <ModalContents>
      <ModalMessage>
        {diseaseNameDeleted} 이 다 나았나요? 다 나았으면 '나았어요'를, 잘 못 입력하셨으면 '삭제'를 눌러주세요.
      </ModalMessage>
      <ButtonArea>
        <PostToPastDiseasesButton>나았어요</PostToPastDiseasesButton>
        <DeleteDiseaseButton>삭제</DeleteDiseaseButton>
      </ButtonArea>
    </ModalContents>
  )

  let contents = null;
  if ( currentDiseases ) {
    contents = (
      currentDiseases.map((i, k) => (
        <Contents key={k}>
          <ContentDot
            className='fas fa-circle'
          />
          {i.name}
          <CloseImg
            src={close} 
            onClick={() => 
              toggleDeleteDiseaseHandler(i.name, i.id)}
          />
        </Contents>
      ))
    )
  }

  return (
    <DiseasesAndExtraDrugsContainer>
      <Header>
        질환명 및 특이사항
      </Header>
      {contents}
      {modalShow
        ? <Modal
            modalOff={() => toggleDeleteDiseaseHandler(null, null)}
            img={medIcon}
            title='투약'
            content={deleteCurrentDiseaseModalContent}
          />
        : null
      }
    </DiseasesAndExtraDrugsContainer>
  )
};

export default DiseasesAndExtra;