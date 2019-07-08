import React from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 100%;
  position: fixed;
  z-index: 100;
  top: 0;
  padding: 20px;
  background-image: linear-gradient(121deg, #00cfff, #00a2ff);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  font-weight: 800;
  font-size: 1.25rem;
  text-decoration: none;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <StyledNavLink to="/medicine">검색</StyledNavLink>
      <StyledNavLink to="/">투약</StyledNavLink>
      <StyledNavLink to="/mypage">마이페이지</StyledNavLink>
    </HeaderContainer>
  );
};

export default Header;
