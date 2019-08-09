import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthStore";
import styled from "styled-components";
import axios from "../../apis";
import DropoutModal from "../UI/Modal";
import { BasicButton, WhiteButton } from "../UI/SharedStyles";

const FooterContainer = styled.div`
  background-color: #ffffff;
  position: fixed;
  bottom: 1.4375rem;
  height: 76px;
  width: 50%;
  z-index: 200;
`;

const ItemWrapper = styled.div`
  height: 100%;
`;

const EachItem = styled.div`
  text-decoration: underline;
  text-underline-position: under;
  width: auto;
  padding: 4px;
  font-size: 14px;
`;

const YesButton = styled(BasicButton)`
  background-color: #ffffff;
  color: var(--twoyak-blue);
  box-shadow: 1px 2px 7px 1px rgba(212, 212, 212, 0.5);
  font-weight: 1rem;
`;

const ModalContents = styled.div`
  height: 14.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 800;
`;

const ButtonArea = styled.div`
  width: 14.8125rem;
  display: flex;
  margin-top: 1.875rem;
`;

function Footer({ routes }) {
  const [dropoutModalShow, setDropoutModalShow] = useState(false);
  const { state, dispatch } = useContext(AuthContext);

  const deleteUserHandler = () => {
    axios({
      method: "DELETE",
      url: `/api/users/${state.userId}`,
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    })
      .then(async response => {
        await dispatch({
          type: "SIGNOUT"
        });
        alert("회원탈퇴가 완료되었습니다");
      })
      .catch(error => alert("에러가 발생했습니다"));
  };

  const modalContent = (
    <ModalContents>
      정말 탈퇴하시겠습니까?
      <ButtonArea>
        <BasicButton onClick={() => setDropoutModalShow(false)}>
          아니오
        </BasicButton>
        <YesButton onClick={() => deleteUserHandler()}>예</YesButton>
      </ButtonArea>
    </ModalContents>
  );
  return (
    <FooterContainer>
      <ItemWrapper>
        <EachItem onClick={() => routes.history.push("/terms/use")}>
          이용약관
        </EachItem>
        <EachItem onClick={() => routes.history.push("/terms/info")}>
          개인정보취급방침
        </EachItem>
        <EachItem onClick={() => setDropoutModalShow(true)}>탈퇴하기</EachItem>
      </ItemWrapper>
      {dropoutModalShow ? (
        <DropoutModal
          modalOff={() => setDropoutModalShow(false)}
          img
          title="회원탈퇴"
          content={modalContent}
        />
      ) : null}
    </FooterContainer>
  );
}

export default Footer;
