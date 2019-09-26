// import React, { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../contexts/AuthStore";
// import styled from "styled-components";
// import axios from "../apis";

// import Topbar from "../components/Mypage/Topbar";
// import UserGeneralInfo from "../components/Mypage/UserGeneralInfo";
// import Diseases from "../components/Mypage/Diseases";
// import WatchDrugs from "../components/Mypage/WatchDrugs";
// import Footer from "../components/Mypage/Footer";
// import ChangeUserModal from "../components/UI/Modal";
// import AddDash from "../assets/images/add-dash.svg";
// import ChangeUserIcon from "../assets/images/change-user-icon.svg";

// const MyPageContainer = styled.div`
//   width: 100%;
//   padding: 20px;
//   height: 100vh;
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: 200;
//   background-color: white;
//   overflow: auto;
// `;

// const Divider = styled.div`
//   width: 100%;
//   height: 1px;
//   opacity: 0.1;
//   background-color: var(--twoyak-blue);
// `;

// const ModalContents = styled.div``;

// const ModalMessage = styled.div`
//   width: auto;
//   font-size: 0.875rem;
//   font-weight: 800;
//   color: #474747;
//   margin-bottom: 38px;
// `;

// const AddIcon = styled.img`
//   width: 3.125rem;
// `;

// const ChangeFunction = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding-top: 1.875rem;
//   padding-bottom: 1.875rem;
// `;

// const ChangeUser = styled.img`
//   position: fixed;
//   bottom: 1.4375rem;
//   right: 1.4375rem;
//   z-index: 300;
// `;

// function Mypage(props) {
//   const [currentDrugs, setCurrentDrugs] = useState([]);
//   const [drugReviews, setDrugReviews] = useState([]);
//   const [myConversation] = useState([]);
//   const [familyMedHistoies, setFamilyMedHistories] = useState([]);
//   const [watchDrugs, setWatchDrugs] = useState([]);
//   const [changeUserModalShow, setChangeUserModalShow] = useState(false);

//   const { state, dispatch } = useContext(AuthContext);

//   useEffect(() => {
//     if (state.token) {
//       getUserInfo(state.subUserIndex);
//     }
//   }, [state.token, state.subUserIndex]);

//   const getUserInfo = id => {
//     axios({
//       method: "GET",
//       url: "/user/mypage",
//       headers: {
//         Authorization: `Bearer ${state.token}`
//       }
//     }).then(async response => {
//       const payload = response.data;
//       dispatch({
//         type: "CHANGE_SUB_USER",
//         subUserId: payload.infos[id].sub_user.basic_info.id,
//         userName: payload.infos[id].sub_user.basic_info.user_name,
//         subUserIndex: id
//       });
//       setCurrentDrugs(payload.infos[id].sub_user.current_drugs);
//       setFamilyMedHistories(payload.infos[id].sub_user.family_med_his);
//       setDrugReviews(payload.drug_reviews);
//       setWatchDrugs(payload.watch_drugs);
//     });
//   };

//   const toggleChangeUserModalHandler = () => {
//     setChangeUserModalShow(!changeUserModalShow);
//   };

//   const modalContent = (
//     <ModalContents>
//       <ChangeFunction>
//         {state.subUsers
//           ? state.subUsers.map((i, k) =>
//               i.id !== state.subUserId ? (
//                 <ModalMessage
//                   key={k}
//                   onClick={() => {
//                     getUserInfo(k);
//                     toggleChangeUserModalHandler();
//                   }}
//                 >
//                   {i.user_name}
//                 </ModalMessage>
//               ) : null
//             )
//           : null}
//         <AddIcon
//           src={AddDash}
//           alt="add-users"
//           onClick={() => props.history.push("/add-sub-user")}
//         />
//       </ChangeFunction>
//     </ModalContents>
//   );

//   return (
//     <MyPageContainer>
//       <Topbar history={props.history} />
//       <UserGeneralInfo
//         currentDrugs={currentDrugs}
//         drugReviews={drugReviews}
//         myConversation={myConversation}
//         userChange={id => getUserInfo(id)}
//         history={props.history}
//       />
//       <Divider />
//       <Diseases
//         medHistory={familyMedHistoies}
//         historyChange={id => getUserInfo(id)}
//       />
//       <Divider />
//       <WatchDrugs watchDrugs={watchDrugs} watchChange={id => getUserInfo(id)} />
//       <ChangeUser
//         src={ChangeUserIcon}
//         alt="change-user"
//         onClick={() => toggleChangeUserModalHandler()}
//       />
//       <Footer routes={props} />
//       {changeUserModalShow ? (
//         <ChangeUserModal
//           modalOff={() => toggleChangeUserModalHandler()}
//           img
//           title="사용자 추가/변경"
//           content={modalContent}
//         />
//       ) : null}
//     </MyPageContainer>
//   );
// }

// export default Mypage;

// Netflix fast api
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthStore";
import styled from "styled-components";
import axios from "../apis";

import Topbar from "../components/Mypage/Topbar";
import UserGeneralInfo from "../components/Mypage/UserGeneralInfo";
import Diseases from "../components/Mypage/Diseases";
import WatchDrugs from "../components/Mypage/WatchDrugs";
import Footer from "../components/Mypage/Footer";
import Modal from "../components/UI/Modals/Modal";
import { BasicButton } from "../components/UI/SharedStyles";
import DeleteIcon from "../assets/images/trash-can-outline.svg";

const MyPageContainer = styled.div`
  width: 100%;
  padding: 20px 20px 0 20px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: white;
  overflow: auto;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 500px;
  position: relative;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  opacity: 0.2;
  background-color: var(--twoyak-blue);
  margin-top: 1.3125rem;
`;

const ModalContents = styled.div`
  -webkit-overflow-scrolling: touch;
  max-height: 65vh;
  overflow: scroll;
`;

const ModalMessage = styled.div`
  width: 95%;
  font-size: 0.875rem;
  font-weight: 800;
  color: #474747;
  margin-bottom: 38px;
`;

const Indicator = styled.div`
  font-size: 0.6875rem;
  color: #474747;
  opacity: 0.7;
  margin-top: 4px;
  display: flex;
`;

const ChangeFunction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.875rem;
  overflow: auto;
  height: 500px;
`;

const ChangeUserModal = styled(Modal)``;

const SubUser = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SubUserName = styled.div``;

const SubUserDrugCount = styled.div`
  display: block;
`;

const DrugCount = styled.div`
  color: var(--twoyak-blue);
  margin-left: 0.5rem;
`;

const Info = styled.div`
  font-size: 0.75rem;
  opacity: 0.6;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
`;

const AppendButton = styled(BasicButton)`
  position: absolute;
  bottom: 1rem;
`;

const DeleteButton = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const AskDeleteSubUserContainer = styled.div`
  padding-top: 0.5rem;
  margin: auto;
  width: 100%;
  text-align: center;
`;

const AskDeleteSubUser = styled.div`
  color: red;
  font-size: 0.7rem;
  font-weight: 400;
`;

const Summary = styled.div`
  width: 100%;
`;

const ConfirmDeleteButtonArea = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0.3rem;
`;

const ConfirmDeleteButton = styled(BasicButton)`
  padding-right: 1rem;
  padding-left: 1rem;
`;

const CancelDeleteButton = styled(ConfirmDeleteButton)`
  color: var(--twoyak-blue);
  background-color: white;
  border: var(--twoyak-blue) 1px solid;
`;

function Mypage(props) {
  const [payload, setPayload] = useState([]);
  const [currentDrugsCount, setCurrentDrugsCount] = useState(0);
  const [drugReviewsCount, setDrugReviewsCount] = useState(0);
  const [familyMedHistoies, setFamilyMedHistories] = useState([]);
  const [watchDrugs, setWatchDrugs] = useState([]);
  const [changeUserModalShow, setChangeUserModalShow] = useState(false);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState(false);
  const [deleteUserIndex, setDeleteUserIndex] = useState(null);

  const { state: authState, dispatch } = useContext(AuthContext);

  useEffect(() => {
    getUserInfo(authState.subUserIndex);
  }, [authState.token, authState.subUserIndex]);

  const getUserInfo = id => {
    axios({
      method: "GET",
      url: "/user/mypage/test",
      headers: {
        Authorization: `Bearer ${authState.token}`
      }
    }).then(async response => {
      const payload = response.data;
      dispatch({
        type: "CHANGE_SUB_USER",
        subUserId: payload.included[id].id,
        userName: payload.included[id].attributes.user_name,
        subUserIndex: id
      });
      setCurrentDrugsCount(payload.included[id].meta.current_drugs_count);
      setDrugReviewsCount(payload.data.meta.drug_reviews_count);
      setFamilyMedHistories(payload.included[id].meta.family_med_histories);
      setWatchDrugs(payload.data.meta.watch_drugs);
      setPayload(payload.included);
    });
  };

  const toggleChangeUserModalHandler = () => {
    setChangeUserModalShow(!changeUserModalShow);
    setDeleteUserIndex(null);
  };

  const askDeleteUserHandler = k => {
    setDeleteUserIndex(k);
    setConfirmDeleteUser(true);
  };

  const confirmDeleteUserHandler = userId => {
    axios({
      method: "DELETE",
      url: `/user/sub_users/${userId}`,
      headers: {
        Authorization: `Bearer ${authState.token}`
      }
    })
      .then(() => {
        getUserInfo(authState.subUserIndex);
        alert("사용자 삭제를 완료하였습니다.");
        setChangeUserModalShow(false);
      })
      .catch(error => alert(error.response));
  };

  const modalContent = (
    <ModalContents>
      <ChangeFunction>
        <Info>
          두 명 이상의 복용 내역을 분리해 더 편하게 관리해보세요. (예: 부모님,
          자녀 등)
        </Info>
        {authState.subUsers
          ? payload.map((i, k) =>
              i.id !== authState.subUserId ? (
                <ModalMessage key={k}>
                  <SubUser>
                    <Summary
                      onClick={() => {
                        getUserInfo(k);
                        toggleChangeUserModalHandler();
                      }}
                    >
                      <SubUserName>{i.attributes.user_name}</SubUserName>
                      <SubUserDrugCount>
                        <Indicator>
                          복용 중인 약:{" "}
                          <DrugCount>{i.meta.current_drugs_count}</DrugCount>
                        </Indicator>
                      </SubUserDrugCount>
                    </Summary>
                    {i.id !== payload[0].id ? (
                      <DeleteButton
                        src={DeleteIcon}
                        alt="delete-sub-user-button"
                        onClick={() => askDeleteUserHandler(k)}
                      />
                    ) : null}
                  </SubUser>
                  {confirmDeleteUser && deleteUserIndex === k ? (
                    <AskDeleteSubUserContainer>
                      <AskDeleteSubUser>
                        {i.attributes.user_name}을 정말로 삭제하시겠습니까?
                      </AskDeleteSubUser>
                      <ConfirmDeleteButtonArea>
                        <ConfirmDeleteButton
                          onClick={() => confirmDeleteUserHandler(Number(i.id))}
                        >
                          확인
                        </ConfirmDeleteButton>
                        <CancelDeleteButton
                          onClick={() => askDeleteUserHandler()}
                        >
                          취소
                        </CancelDeleteButton>
                      </ConfirmDeleteButtonArea>
                    </AskDeleteSubUserContainer>
                  ) : null}
                  <Divider />
                </ModalMessage>
              ) : null
            )
          : null}
        <AppendButton onClick={() => props.history.push("/add-sub-user")}>
          사용자 추가하기
        </AppendButton>
      </ChangeFunction>
    </ModalContents>
  );

  return (
    <MyPageContainer>
      <Container>
        <Topbar history={props.history} />
        <UserGeneralInfo
          currentDrugsCount={currentDrugsCount}
          drugReviewsCount={drugReviewsCount}
          userChange={id => getUserInfo(id)}
          history={props.history}
        />
        <Divider />
        <Diseases
          medHistory={familyMedHistoies}
          historyChange={id => getUserInfo(id)}
        />
        <Divider />
        <WatchDrugs
          watchDrugs={watchDrugs}
          watchChange={id => getUserInfo(id)}
        />
        <Footer
          routes={props}
          changeUser={() => toggleChangeUserModalHandler()}
        />
        {changeUserModalShow ? (
          <ChangeUserModal
            modalOff={() => toggleChangeUserModalHandler()}
            img
            title="사용자 추가/변경"
            content={modalContent}
          />
        ) : null}
      </Container>
    </MyPageContainer>
  );
}

export default Mypage;
