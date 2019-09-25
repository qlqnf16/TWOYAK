import React, { useState, useContext } from "react";
import styled from "styled-components";
import Modal from "../UI/Modals/Modal";
import { AuthContext } from "../../contexts/AuthStore";
import AddDash from "../../assets/images/add-dash.svg";
import ChangeUserIcon from "../../assets/images/change-user-icon.svg";
import { BasicButton } from "../UI/SharedStyles";

const ModalContents = styled.div`
  -webkit-overflow-scrolling: touch;
  max-height: 65vh;
  overflow: scroll;
  padding: 1rem 0;
  text-align: center;
`;

const ModalMessage = styled.div`
  width: auto;
  font-size: 0.875rem;
  font-weight: 800;
  color: #474747;
  margin-bottom: 38px;
`;

const AddIcon = styled.img`
  width: 3.125rem;
`;

const Info = styled.div`
  font-size: 0.75rem;
  opacity: 0.6;
  margin-top: 1rem;
`;

const ChangeFunction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.875rem;
  padding-bottom: 1.875rem;
  overflow: auto;
  height: 500px;
`;

const ChangeUserIconButton = styled.img`
  /* position: fixed;
  bottom: 1.4375rem;
  right: 1.4375rem;
  z-index: 300; */
`;

const ChangeUserTextButton = styled(BasicButton)`
  border: solid 1px #00a6ff99;
  background-color: #ffffff;
  color: var(--twoyak-black);
  padding: 0.3rem 1rem;
  font-weight: 700;
`;

const ChangeUser = ({ history, getUserInfo }) => {
  const [changeUserModalShow, setChangeUserModalShow] = useState();
  const { state: authState } = useContext(AuthContext);

  const toggleChangeUserModalHandler = () => {
    setChangeUserModalShow(!changeUserModalShow);
  };

  const modalContent = (
    <ModalContents>
      <Info>
        두 명 이상의 복용 내역을 분리해 더 편하게 관리해보세요. (예: 부모님,
        자녀 등)
      </Info>
      <ChangeFunction>
        {authState.subUsers
          ? authState.subUsers.map((i, k) =>
              i.id !== authState.subUserId ? (
                <ModalMessage
                  key={k}
                  onClick={() => {
                    getUserInfo(k);
                    toggleChangeUserModalHandler();
                  }}
                >
                  {i.user_name}
                </ModalMessage>
              ) : null
            )
          : null}
        <AddIcon
          src={AddDash}
          alt="add-users"
          onClick={() => history.push("/add-sub-user")}
        />
      </ChangeFunction>
    </ModalContents>
  );

  return (
    <>
      <ChangeUserIconButton
        src={ChangeUserIcon}
        alt="change-user"
        onClick={() => toggleChangeUserModalHandler()}
      />
      {changeUserModalShow ? (
        <Modal
          modalOff={() => toggleChangeUserModalHandler()}
          img
          title="사용자 추가/변경"
          content={modalContent}
        />
      ) : null}
    </>
  );
};

export default ChangeUser;
