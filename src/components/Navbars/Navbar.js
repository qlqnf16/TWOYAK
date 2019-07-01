import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const activeClassName = "nav-item-active";
const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  margin: 0 10px;
  color: black;
  text-decoration: none;

  &.${activeClassName} {
    color: #2779a9;
  }
`;

const Navbar = () => {
  return (
    <div>
      <StyledNavLink exact to="/">
        홈
      </StyledNavLink>
      <StyledNavLink to="/login">로그인</StyledNavLink>
      <StyledNavLink to="/medicine">검색</StyledNavLink>
    </div>
  );
};

export default Navbar;
