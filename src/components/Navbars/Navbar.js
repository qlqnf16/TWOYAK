import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { breakpoints } from "../UI/SharedStyles";

const NavContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #03aeff;
  @media (max-width: ${breakpoints.medium}) {
    position: fixed;
    bottom: 0;
    justify-content: space-between;
    height: 3rem;
  }
`;

const NavTransition = styled.div`
  .active {
    visibility: visible;
    transition: all 200ms ease-in;
  }
  .hidden {
    visibility: hidden;
    transition: all 200ms ease-out;
    transform: translate(0, 100%);
  }
`;

const activeClassName = "nav-item-active";
const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  margin: 0 10px;
  color: white;
  opacity: 0.8;
  text-decoration: none;

  &.${activeClassName} {
    opacity: 1;
    font-weight: bold;
  }
`;

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [show, setShow] = useState(true);

  const handleScroll = () => {
    setPrevScrollPos(document.body.getBoundingClientRect().top);
    setShow(document.body.getBoundingClientRect().top > prevScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <NavTransition>
      <NavContainer className={show ? "active" : "hidden"}>
        <StyledNavLink exact to="/">
          홈
        </StyledNavLink>
        <StyledNavLink to="/login">로그인</StyledNavLink>
        <StyledNavLink to="/medicine">검색</StyledNavLink>
      </NavContainer>
    </NavTransition>
  );
};

export default Navbar;
