import React from "react";
import styled from "styled-components";
import close from "../../assets/images/(white)close.svg";
import medIcon from "../../assets/images/(white)med-icon.svg";

const Backdrop = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 140;
  opacity: 0.5;
  background-color: #b2c0ce;
`;

const Container = styled.div`
  width: 73%;
  position: fixed;
  top: 6.12rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 150;
  background-color: white;
  border-radius: 13px;
  box-shadow: 1px 2px 7px 1px rgba(212, 212, 212, 0.5);
`;

const Header = styled.div`
  width: 100%;
  padding: 1rem;
  text-align: center;
  color: white;
  background-color: var(--twoyak-blue);
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  font-weight: 800;
  font-size: 1rem;
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 1rem;
  height: 1rem;
`;

const HeaderIcon = styled.img`
  margin-right: 6px;
`;

const Content = styled.div`
  width: 86%;
  margin: 0 auto;
`;

const Modal = ({ title, content, modalOff }) => (
  <>
    <Container>
      <Header>
        <CloseIcon src={close} alt="close" onClick={modalOff} />
        <HeaderIcon src={medIcon} alt="med-icon" />
        {title}
      </Header>
      <Content>{content}</Content>
    </Container>
    <Backdrop onClick={modalOff} />
  </>
);

export default Modal;
