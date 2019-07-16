import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthStore";
import styled from "styled-components";
import ChangeUserModal from "../UI/Modal";
import AddDash from "../../assets/images/add-dash.svg";

const UserGeneralInfoContainer = styled.div`
  padding: 17px;
`;

const SayHello = styled.div`
  font-size: 1rem;
  font-weight: 800;
  color: #474747;
  margin-bottom: 2.25rem;
  display: flex;
  justify-content: space-between;
`;

const GeneralInfo = styled.div`
  display: flex;
  width: 10rem;
  justify-content: space-between;
`;

const EachInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Count = styled.div`
  font-size: 1.125rem;
  font-weight: 800;
  color: var(--twoyak-blue);
`;

const InfoIndex = styled.div`
  width: auto;
  font-size: 0.6875rem;
  color: #474747;
`;

const ModalContents = styled.div``;

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

const ChangeFunction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.875rem;
  padding-bottom: 1.875rem;
`;

function UserGeneralInfo({
  currentDrugs,
  drugReviews,
  myConversation,
  userChange,
  history
}) {
  const { state: authState } = useContext(AuthContext);
  const [changeUserModalShow, setChangeUserModalShow] = useState(false);

  const infoIndex = [
    {
      label: "복용 중인 약",
      value: currentDrugs.length
    },
    {
      label: "리뷰",
      value: drugReviews.length
    },
    {
      label: "내 대화",
      value: myConversation.length
    }
  ];

  let generalInfo = null;
  if (currentDrugs && drugReviews && myConversation) {
    generalInfo = (
      <GeneralInfo>
        {infoIndex.map((i, k) => (
          <EachInfo key={k}>
            <Count>{i.value}</Count>
            <InfoIndex>{i.label}</InfoIndex>
          </EachInfo>
        ))}
      </GeneralInfo>
    );
  }

  const toggleChangeUserModalHandler = () => {
    setChangeUserModalShow(!changeUserModalShow);
  };

  const modalContent = (
    <ModalContents>
      <ChangeFunction>
        {authState.subUsers
          ? authState.subUsers.map((i, k) =>
              i.id !== authState.subUserId ? (
                <ModalMessage
                  key={k}
                  onClick={() => {
                    userChange(k);
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
          onClick={() => history.push("/add-user")}
        />
      </ChangeFunction>
    </ModalContents>
  );

  return (
    <UserGeneralInfoContainer>
      <SayHello>
        {authState.userName} 님, 안녕하세요
        <div onClick={() => toggleChangeUserModalHandler()}>
          사용자 추가/변경
        </div>
      </SayHello>
      {generalInfo}
      {changeUserModalShow ? (
        <ChangeUserModal
          modalOff={() => toggleChangeUserModalHandler()}
          img
          title="사용자 추가/변경"
          content={modalContent}
        />
      ) : null}
    </UserGeneralInfoContainer>
  );
}

export default UserGeneralInfo;
