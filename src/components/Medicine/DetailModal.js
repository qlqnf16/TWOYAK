import React from "react";
import styled from "styled-components";
import { Close } from "../UI/Icons";

const ModalContainer = styled.div`
  width: 70%;
  position: absolute;
  z-index: 100;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  background-color: white;
  border: 1px solid #e4e4e4;
  box-shadow: 3px 3px 20px -2px #dbdbdb;
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
