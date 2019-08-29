import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { breakpoints } from "../UI/SharedStyles";

const NavBackground = styled.div`
  width: 100%;
  background-image: linear-gradient(121deg, #00cfff, #00a2ff);
  position: fixed;
  bottom: 0;
  justify-content: space-between;
  height: 3rem;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavContainer = styled.div`
  width: 700px;
  @media (max-width: ${breakpoints.medium}) {
    width: 100%;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.37rem 0.6rem;
`

const NavTransition = styled.div`
  @media (max-width: ${breakpoints.medium}) {
    .active {
      visibility: visible;
      transition: all 200ms ease-in;
    }
    .hidden {
      visibility: hidden;
      transition: all 200ms ease-out;
      transform: translate(0, 100%);
    }
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
      <NavBackground className={show ? "active" : "hidden"}>
        <NavContainer>
          <StyledNavLink exact to="/">
            홈
        </StyledNavLink>
          <StyledNavLink to="/health-record">복용내역</StyledNavLink>
          <StyledNavLink to="/all-reviews">리뷰 모아보기</StyledNavLink>
        </NavContainer>
      </NavBackground>
    </NavTransition>
  );
};

export default Navbar;
