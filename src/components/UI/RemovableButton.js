import React from "react";
import styled from "styled-components";
import { BasicButton } from "./SharedStyles";
import close from "../../assets/images/(white)close.svg";

const Button = styled(BasicButton)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 9px 9px 0;
  font-size: 0.7rem;
  cursor: auto;
`;

const CloseIcon = styled.img`
  margin-left: 6px;
  cursor: pointer;
`;

const RemovableButton = ({ effect, deleteAdverseEffect }) => {
  return (
    <Button>
      {effect.symptom_name}
      <CloseIcon
        onClick={() => deleteAdverseEffect(effect.id)}
        src={close}
        alt="close"
      />
      {/* // <Close onClick={() => deleteEffect(effect.id)} /> */}
    </Button>
  );
};

export default RemovableButton;
