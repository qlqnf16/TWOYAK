import React, { useState, useContext, useEffect } from "react";
import axios from "../../apis";
import styled from "styled-components";
import Modal from "../UI/Modal";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../../contexts/AuthStore";
import { BasicInput, BasicButton } from "../UI/SharedStyles";

const SuggestionsContainer = styled.div`
  margin-top: 1.375rem;
  width: 11.125rem;
`;

const SuggestionButton = styled.button`
  width: 100%;
  height: 2rem;
  border-radius: 16px;
  border: solid 1px var(--twoyak-blue);
  text-align: center;
  background-color: #ffffff;
  font-weight: 800;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 8rem;
  border-radius: 1.5rem;
  border: solid 1px var(--twoyak-blue);
  padding: 1rem;
  resize: none;
`;

const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalMessage = styled.div`
  margin-top: 1.0625rem;
  height: 22px;
  font-size: 10px;
  letter-spacing: -0.24px;
  color: #8c8c8c;
`;

const EmailInput = styled(BasicInput)`
  width: 100%;
  height: 33px;
`;

const SuggestionModal = styled(Modal)`
  display: block;
`;

const ModalInput = styled.div`
  margin-top: 0.875rem;
  width: 100%;
`;

const Indicator = styled.div`
  font-size: 12px;
  font-weight: bold;
  letter-spacing: -0.29px;
  color: #555555;
`;

const SubmitButton = styled(BasicButton)`
  margin-top: 3.8rem;
  margin-bottom: 1.4rem;
`;

function Suggestions() {
  const [suggestionModalShow, setSuggestionModalShow] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [contact, setContact] = useState("");
  const { state: authState } = useContext(AuthContext);

  useEffect(() => {
    if (authState.token) {
      setContact(jwt_decode(authState.token).user.email);
    }
  }, [authState.token]);

  const submitSuggestionsHandler = () => {
    axios
      .post(
        "/suggestions",
        {
          suggestion: {
            user_id: authState.userId,
            title: "건의사항 및 오류신고",
            body: suggestion,
            contact: contact
          }
        },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        }
      )
      .then(response => {
        alert("건의하기 및 오류신고가 정상적으로 이루어졌습니다.");
        setSuggestionModalShow(false);
      })
      .catch(error => alert(error.response.data.errors[0]));
  };

  const suggestionModalContent = suggestionModalShow ? (
    <ModalContents>
      <ModalMessage>
        발신 이메일로 답변 드리니, 이메일을 확인해주시기 바랍니다.
      </ModalMessage>
      <ModalInput>
        <Indicator>발신 이메일</Indicator>
        <EmailInput
          value={contact}
          onChange={e => setContact(e.target.value)}
        />
      </ModalInput>
      <ModalInput>
        <Indicator>건의사항 및 오류내용</Indicator>
        <TextArea
          placeholder="내용"
          onChange={e => setSuggestion(e.target.value)}
        />
      </ModalInput>
      <SubmitButton onClick={() => submitSuggestionsHandler()}>
        전송
      </SubmitButton>
    </ModalContents>
  ) : null;

  return (
    <SuggestionsContainer>
      <SuggestionButton onClick={() => setSuggestionModalShow(true)}>
        건의하기 및 오류신고
      </SuggestionButton>
      {suggestionModalShow ? (
        <SuggestionModal
          modalOff={() => setSuggestionModalShow(false)}
          img
          title="건의하기 및 오류신고"
          content={suggestionModalContent}
        />
      ) : null}
    </SuggestionsContainer>
  );
}

export default Suggestions;
