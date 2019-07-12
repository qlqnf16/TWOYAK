import React, { useState } from 'react';
import styled from 'styled-components';

import "@fortawesome/fontawesome-free/css/all.css";
import close from "../../assets/images/close.svg";
import HeartFill from "../../assets/images/heart-fill.svg";
import medIcon from "../../assets/images/(white)med-icon.svg";
import { BasicButton } from "../UI/SharedStyles";
import { Header, Contents, ContentDot, CloseImg, ModalContents, ModalMessage, ButtonArea } from './DiseasesAndExtra';
import Modal from '../UI/Modal';

const WatchDrugsContainer = styled.div`
  padding: 17px;
`

const HeartFillImg = styled(CloseImg)`
`

const SelectButton = styled(BasicButton)`
  width: 50%;
`

function WatchDrugs({
  watchDrugs
}) {
  const [modalShow, setModalShow] = useState(false);
  const [watchDrugNameDeleted, setWatchDrugNameDeleted] = useState(null);
  const [watchDrugIdDeleted, setWatchDrugIdDeleted] = useState(null);

  const toggleWatchDrugHandler = (name, id) => {
    if ( name && id ) {
      setWatchDrugNameDeleted(name);
      setWatchDrugIdDeleted(id);
    } else {
      setWatchDrugNameDeleted(null);
      setWatchDrugIdDeleted(null);
    };
    setModalShow(!modalShow);
  }

  let contents = null;
  if ( watchDrugs ) {
    contents = (
      watchDrugs.map((i, k) => (
        <Contents key={k}>
          <ContentDot 
            className='fas fa-circle'
          />
          {i.name}
          <CloseImg 
            src={close}
            onClick={() => 
              toggleWatchDrugHandler(i.name, i.id)
            }
          />
        </Contents>
      ))
    )
  };

  const deleteWatchDrugModalContent = (
    <ModalContents>
      <ModalMessage>
        {watchDrugNameDeleted} 을/를 관심 목록에서 삭제하시겠습니까?
      </ModalMessage>
      <ButtonArea>
        <SelectButton>
          예
        </SelectButton>
        <SelectButton
          onClick={() => 
            toggleWatchDrugHandler(null, null)
          }
        >
          아니오
        </SelectButton>
      </ButtonArea>
    </ModalContents>
  )

  return (
    <WatchDrugsContainer>
      <Header>
        관심목록
        <HeartFillImg src={HeartFill} />
      </Header>
      {contents}
      {modalShow
        ? <Modal
            modalOff={() => toggleWatchDrugHandler(null, null)}
            img={medIcon}
            title='투약'
            content={deleteWatchDrugModalContent}
          />
        : null}
    </WatchDrugsContainer>
  )
};

export default WatchDrugs;