import React from "react";
import Modal from "../../UI/Modal";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 116%;
  margin: 0 0 0 -1.2rem;
`;

const Button = styled.div`
  width: 50%;
  height: 3.7rem;
  border-right: ${props => props.border && "1px solid #d8d8d8"};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-size: 0.8rem;
  font-weight: bold;
  color: --var(twoyak-black);
`;

const DeleteModal = ({
  additionalModalToggle,
  deleteCurrentDrug,
  toPastDrug
}) => (
  <Modal
    title="복용목록에서 제거하기"
    content={
      <Container>
        <Button border onClick={toPastDrug}>
          과거복용내역에 추가
        </Button>
        <Button onClick={deleteCurrentDrug}>삭제하기</Button>
      </Container>
    }
    modalOff={() => {
      additionalModalToggle("delete");
    }}
  />
);

export default DeleteModal;
