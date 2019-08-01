import React from "react";
import { Link } from "react-router-dom";
import Modal from "../UI/Modal";
import { BasicButton, BasicText } from "../UI/SharedStyles";
import styled from "styled-components";

const ModalContainer = styled.div`
  padding: 2.5rem 0;
  text-align: center;
`;

const Text = styled(BasicText)`
  display: block;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2.5rem;
  font-size: 0.875rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const LoginModal = ({ modalOff }) => (
  <Modal
    title="투약"
    modalOff={modalOff}
    content={
      <ModalContainer>
        <Text>
          로그인하시면 이용 가능한
          <br />
          투약의 맞춤형 관리서비스 입니다
        </Text>
        <BasicButton>
          <StyledLink to="/login">로그인 하러가기</StyledLink>
        </BasicButton>
      </ModalContainer>
    }
  />
);

export default LoginModal;
