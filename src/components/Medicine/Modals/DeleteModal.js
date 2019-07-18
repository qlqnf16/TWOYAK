import React from "react";
import Modal from "../../UI/Modal";

const DeleteModal = ({
  additionalModalToggle,
  deleteCurrentDrug,
  toPastDrug
}) => (
  <Modal
    title="현재 복용내역에서 제거하기"
    content={
      <div>
        <div onClick={deleteCurrentDrug}>제거하기</div>
        <div onClick={toPastDrug}>복용종료</div>
      </div>
    }
    modalOff={additionalModalToggle("delete")}
  />
);

export default DeleteModal;
