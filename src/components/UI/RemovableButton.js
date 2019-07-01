import React from "react";
import styled from "styled-components";
import { BasicButton } from "./SharedStyles";

const Button = styled(BasicButton)`
  margin-right: 9px;
  font-size: 0.9rem;
  cursor: auto;
`;

const CloseIcon = styled.div`
  display: inline;
  margin-left: 6px;
  color: #9fc3d8;
  cursor: pointer;
`;

const RemovableButton = ({ effect, deleteEffect }) => {
  return (
    <Button>
      {effect.symptom_name}
      <CloseIcon onClick={() => deleteEffect(effect.id)}>x</CloseIcon>
    </Button>
  );
};

export default RemovableButton;
