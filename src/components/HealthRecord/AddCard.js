import React from "react";
import { EmptyCard } from "../UI/SharedStyles";
import { ReactComponent as AddButton } from "../../assets/images/add-dash.svg";
import styled from "styled-components";

const Text = styled.div`
  color: var(--twoyak-black);
  opacity: 0.8;
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  font-weight: bold;
  text-align: center;
`;

const AddCard = ({ text }) => {
  return (
    <EmptyCard>
      <Text>{text}</Text>
      <AddButton />
    </EmptyCard>
  );
};

export default AddCard;
