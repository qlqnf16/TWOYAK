import React, { useContext } from "react";
import { AuthContext } from '../../contexts/AuthStore';
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const UserGeneralInfoContainer = styled.div`
  padding: 17px;
`

const SayHello = styled.div`
  font-size: 1rem;
  font-weight: 800;
  color: #474747;
  margin-bottom: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const GeneralInfo = styled.div`
  display: flex;
  width: 10rem;
  justify-content: space-between;
`

const EachInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Count = styled.div`
  font-size: 1.125rem;
  font-weight: 800;
  color: var(--twoyak-blue);
`

const InfoIndex = styled.div`
  width: auto;
  font-size: 0.6875rem;
  color: #474747;
`

const SignoutButton = styled.div`
  width: auto;
  opacity: 0.6;
  font-size: 0.6875rem;
  color: #474747;
`

function UserGeneralInfo({
  currentDrugs,
  drugReviews,
  myConversation,
}) {

  const { state: authState, dispatch } = useContext(AuthContext);

  const infoIndex = [
    {
      label: '복용 중인 약',
      value: currentDrugs.length
    },
    {
      label: '리뷰',
      value: drugReviews.length
    },
    {
      label: '내 대화',
      value: myConversation.length
    },
  ]

  let generalInfo = null;
  if ( currentDrugs && drugReviews && myConversation ) {
    generalInfo = (
      <GeneralInfo>
        {infoIndex.map((i, k) => (
          <EachInfo key={k}>
            <Count>
              {i.value}
            </Count>
            <InfoIndex>
              {i.label}
            </InfoIndex>
          </EachInfo>
        ))}
      </GeneralInfo>
    )
  }

  return (
    <UserGeneralInfoContainer>
      <SayHello>
        {authState.userName} 님, 안녕하세요
        <SignoutButton
          onClick={() => {
            dispatch({
              type: 'SIGNOUT'
            })
            dispatch({
              type: "SET_AUTH_REDIRECT_PATH",
              path: "/login",
            })
          }}
        >
          로그아웃
        </SignoutButton>
      </SayHello>
      {generalInfo}
      { authState.authRedirectPath ? <Redirect to={authState.authRedirectPath} /> : null}
    </UserGeneralInfoContainer>
  )
};

export default UserGeneralInfo;