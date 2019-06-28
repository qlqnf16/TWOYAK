import React from "react";
import styled from "styled-components";

const Button = styled.div`
  display: inline;
  margin-right: 9px;
  padding: 2px 6px;
  border-radius: 5px;
  font-size: 0.9rem;
  background-color: #2779a9;
  color: white;
`;

const CloseButton = styled.div`
  display: inline;
  margin-left: 6px;
  color: #9fc3d8;
`;

const RemovableButton = ({ effect, deleteEffect }) => {
  return (
    <Button>
      {effect.symptom_name}
      <CloseButton onClick={() => deleteEffect(effect.id)}>x</CloseButton>
    </Button>
  );
};

export default RemovableButton;
