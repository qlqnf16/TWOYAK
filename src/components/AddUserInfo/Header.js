import React from "react";
import { AuthContext } from "../../contexts/AuthStore";
import styled from "styled-components";

const AddInfoHeader = styled.div`
  color: var(--twoyak-blue);
  font-size: 1.125rem;
  font-weight: 800;
  letter-spacing: -0.0268rem;
`;

function Header() {
  return <AddInfoHeader>투약 맞춤화 서비스</AddInfoHeader>;
}

export default Header;
