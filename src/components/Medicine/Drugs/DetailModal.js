import React, { useState } from "react";
import styled from "styled-components";
import { Close } from "../../UI/Icons";
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
height: 100vh;
`

const DetailModal = ({ item_seq, modalOff }) => {
  const [loading, setLoading] = useState(true)

  const hideSpinner = () => {
    setLoading(false);
  }

  return (
    <ModalContainer>
      {loading && <Flex>
        <Spinner />
      </Flex>}
      <div>
        <Close onClick={modalOff} />
      </div>
      <iframe
        title="medicineInfo"
        style={{ width: "100%", minwidht: "100%", height: "100%" }}
        src={`https://nedrug.mfds.go.kr/pbp/CCBBB01/getItemDetail?itemSeq=${item_seq}`}
        frameBorder="0"
        onLoad={hideSpinner}
      />
    </ModalContainer>
  );
};

export default DetailModal;
