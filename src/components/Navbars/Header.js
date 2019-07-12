import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthStore";
import search from "../../assets/images/(white)search-icon.svg";
import user from "../../assets/images/(white)user-icon.svg";

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
  const { state: authState } = useContext(AuthContext);

  return (
    <HeaderContainer>
      <NavLink to="/medicine">
        <img src={search} alt="search-icon" />
      </NavLink>
      <StyledNavLink to="/">투약</StyledNavLink>
      <StyledNavLink to={ authState.token ? '/mypage' : '/login' }>
        <img src={user} alt="user-icon" />
      </StyledNavLink>
    </HeaderContainer>
  );
};

export default Header;
