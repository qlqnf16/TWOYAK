import React from "react";
import styled from "styled-components";
import { Close } from "../../UI/Icons";

const ModalContainer = styled.div`
  width: 100%;
  position: fixed;
  z-index: 100;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: white;
`;

const DetailModal = ({ item_seq, modalOff }) => {
  return (
    <ModalContainer>
      <div>
        <Close onClick={modalOff} />
      </div>
      <iframe
        title="medicineInfo"
        style={{ width: "100%", minwidht: "100%", height: "100%" }}
        src={`https://nedrug.mfds.go.kr/pbp/CCBBB01/getItemDetail?itemSeq=${item_seq}`}
        frameBorder="0"
      />
    </ModalContainer>
  );
};

export default DetailModal;
