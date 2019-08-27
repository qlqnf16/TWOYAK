import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthStore";
import styled from "styled-components";
import axios from "../../apis";
import jwt_decode from "jwt-decode";
import DropoutModal from "../UI/Modals/Modal";
import { BasicButton, BasicInput } from "../UI/SharedStyles";

const FooterContainer = styled.div``;

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
  margin-top: 1.5rem;
`;

const ConfirmPasswordInput = styled(BasicInput)`
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 4rem;
  border-radius: 1.5rem;
  border: solid 1px var(--twoyak-blue);
  padding: 1rem;
  resize: none;
  margin-top: 1rem;
`;

function Footer({ routes }) {
  const [dropoutModalShow, setDropoutModalShow] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [dropoutLoading, setDropoutLoading] = useState(false);
  const { state, dispatch } = useContext(AuthContext);

  const enterDataForDropoutHandler = (e, k) => {
    switch (k) {
      case "confirm-password":
        setConfirmPassword(e.target.value);
        break;
      case "suggestion":
        setSuggestion(e.target.value);
        break;
      default:
        break;
    }
  };

  const deleteUserHandler = () => {
    const email = jwt_decode(state.token).user.email;
    const signinData = {
      email: email,
      password: confirmPassword
    };
    axios
      .post("/api/users/login", signinData)
      .then(response => {
        if (jwt_decode(response.data.auth_token).user.email === email) {
          setDropoutLoading(true);
          axios
            .post(
              "/suggestions",
              {
                suggestion: {
                  user_id: state.userId,
                  title: "탈퇴사유",
                  body: suggestion,
                  contact: email
                }
              },
              {
                headers: {
                  Authorization: `Bearer ${state.token}`
                }
              }
            )
            .then(response =>
              axios({
                method: "DELETE",
                url: `/api/users`,
                headers: {
                  Authorization: `Bearer ${state.token}`
                }
              })
                .then(async response => {
                  await dispatch({
                    type: "SIGNOUT"
                  });
                  alert("회원탈퇴가 완료되었습니다.");
                  routes.history.push("/");
                })
                .catch(error => {
                  setDropoutLoading(false);
                  alert("회원탈퇴에서 에러가 발생하였습니다.");
                })
            )
            .catch(error => {
              setDropoutLoading(false);
              alert("에러가 발생하였습니다.");
            });
        } else {
          setDropoutLoading(false);
          alert("비밀번호를 다시 확인해주세요.");
        }
      })
      .catch(error => {
        setDropoutLoading(false);
        alert("에러가 발생하였습니다.");
      });
  };

  const modalContent = (
    <ModalContents>
      <ConfirmPasswordInput
        type="password"
        value={confirmPassword}
        placeholder="비밀번호"
        onChange={e => enterDataForDropoutHandler(e, "confirm-password")}
      />
      <TextArea
        value={suggestion}
        placeholder="탈퇴 사유를 적어주세요. 서비스 개선에 도움이 됩니다."
        onChange={e => enterDataForDropoutHandler(e, "suggestion")}
      />
      <ButtonArea>
        {dropoutLoading ? (
          <div>실행 중</div>
        ) : (
            <BasicButton onClick={() => deleteUserHandler()}>탈퇴</BasicButton>
          )}
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
          title="정말 탈퇴하시겠습니까?"
          content={modalContent}
        />
      ) : null}
    </FooterContainer>
  );
}

export default Footer;
