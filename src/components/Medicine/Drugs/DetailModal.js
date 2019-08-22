import React, { useState } from "react";
import styled from "styled-components";
import Spinner from "../../UI/Spinner";

const ModalContainer = styled.div`
  width: 100%;
  position: fixed;
  z-index: 100;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: white;
`;

const Flex = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 93vh;
`

const StyleWrapper = styled.div`
  height: 93vh;
  overflow:auto; 
  overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
`

const CloseDiv = styled.div`
  width: 100%;
  height: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
  background-image: linear-gradient(121deg, #00cfff, #00a2ff);
  color: white; 
`

const DetailModal = ({ item_seq, modalOff }) => {
  const [loading, setLoading] = useState(true)

  const hideSpinner = () => {
    setLoading(false);
  }

  return (
    <ModalContainer>
      {loading &&
        <>
          <Flex>
            <Spinner />
          </Flex>
          <CloseDiv onClick={modalOff}>닫기</CloseDiv>
        </>}
      <StyleWrapper>
        <iframe
          id='detail'
          title="medicineInfo"
          style={{ width: "100%", minwidht: "100%", height: "93vh" }}
          src={`https://nedrug.mfds.go.kr/pbp/CCBBB01/getItemDetail?itemSeq=${item_seq}`}
          frameBorder="0"
          onLoad={hideSpinner}
        />
      </StyleWrapper>
      <CloseDiv onClick={modalOff}>닫기</CloseDiv>
    </ModalContainer>
  );
};

export default DetailModal;
