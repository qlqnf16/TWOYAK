import React from "react";
import styled from "styled-components";
import { Line } from "../../components/UI/SharedStyles";

const HeaderContainer = styled.div`
  width: 100%;
`;

const AddInfoHeader = styled.div`
  color: var(--twoyak-blue);
  font-size: 1.125rem;
  font-weight: 800;
  letter-spacing: -0.0268rem;
`;

const Divider = styled(Line)`
  width: 100%;
  margin-top: 0.375rem;
  margin-bottom: 0.125rem;
`;

const AddInfoMessage = styled.div`
  color: #757575;
  opacity: 0.7;
  font-size: 11px;
`;

function Header({ header, message }) {
  return (
    <HeaderContainer>
      <AddInfoHeader>{header}</AddInfoHeader>
      <Divider />
      <AddInfoMessage>{message}</AddInfoMessage>
    </HeaderContainer>
  );
}

export default Header;
