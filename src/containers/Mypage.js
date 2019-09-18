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
import AddDash from "../assets/images/add-dash.svg";

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
  opacity: 0.1;
  background-color: var(--twoyak-blue);
  margin-top: 1.3125rem;
`;

const ModalContents = styled.div`
  overflow: auto;
`;

const ModalMessage = styled.div`
  width: 95%;
  font-size: 0.875rem;
  font-weight: 800;
  color: #474747;
  margin-bottom: 38px;
`;

const AddIcon = styled.img`
  width: 3.125rem;
`;

const Indicator = styled.div`
  font-size: 0.6875rem;
  color: #474747;
  opacity: 0.7;
  margin-top: 4px;
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

const ChangeUserModal = styled(Modal)``;

const SubUser = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SubUserName = styled.div``;

const SubUserDrugCount = styled.div`
  display: flex;
`;

const DrugCount = styled.div`
  color: var(--twoyak-blue);
  font-size: 0.875rem;
  margin-left: 4px;
`;

function Mypage(props) {
<<<<<<< HEAD
=======
  const [payload, setPayload] = useState([]);
>>>>>>> 9e48b1f6d5edfc1039e0c0668fd5c7bd0a95cf0f
  const [currentDrugsCount, setCurrentDrugsCount] = useState([]);
  const [drugReviewsCount, setDrugReviewsCount] = useState([]);
  const [myConversation] = useState([]);
  const [familyMedHistoies, setFamilyMedHistories] = useState([]);
  const [watchDrugs, setWatchDrugs] = useState([]);
  const [changeUserModalShow, setChangeUserModalShow] = useState(false);

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
      console.log(payload);
      dispatch({
        type: "CHANGE_SUB_USER",
        subUserId: payload.included[id].id,
        userName: payload.included[id].attributes.user_name,
        subUserIndex: id
      });
      setCurrentDrugsCount(payload.included[id].meta.current_drugs_count);
      setDrugReviewsCount(payload.data.meta.drug_reviews_count);
      setFamilyMedHistories(payload.included[id].meta.family_med_histories);
<<<<<<< HEAD
      console.log(payload.included[id].meta.family_med_histories);
      setWatchDrugs(payload.data.meta.watch_drugs);
=======
      setWatchDrugs(payload.data.meta.watch_drugs);
      setPayload(payload.included);
>>>>>>> 9e48b1f6d5edfc1039e0c0668fd5c7bd0a95cf0f
    });
  };

  const toggleChangeUserModalHandler = () => {
    setChangeUserModalShow(!changeUserModalShow);
  };

  const modalContent = (
    <ModalContents>
      <ChangeFunction>
        {authState.subUsers
          ? payload.map((i, k) =>
              Number(i.id) !== authState.subUserId ? (
                <ModalMessage
                  key={k}
                  onClick={() => {
                    getUserInfo(k);
                    toggleChangeUserModalHandler();
                  }}
                >
                  <SubUser>
                    <SubUserName>{i.attributes.user_name}</SubUserName>
                    <SubUserDrugCount>
                      <Indicator>복용 중인 약</Indicator>
                      <DrugCount>{i.meta.current_drugs_count}</DrugCount>
                    </SubUserDrugCount>
                  </SubUser>
                  <Divider />
                </ModalMessage>
              ) : null
            )
          : null}
        <AddIcon
          src={AddDash}
          alt="add-users"
          onClick={() => props.history.push("/add-sub-user")}
        />
      </ChangeFunction>
    </ModalContents>
  );

  return (
    <MyPageContainer>
<<<<<<< HEAD
      <Topbar history={props.history} />
      <UserGeneralInfo
        currentDrugsCount={currentDrugsCount}
        drugReviewsCount={drugReviewsCount}
        myConversation={myConversation}
        userChange={id => getUserInfo(id)}
        history={props.history}
      />
      <Divider />
      <Diseases
        medHistory={familyMedHistoies}
        historyChange={id => getUserInfo(id)}
      />
      <Divider />
      <WatchDrugs watchDrugs={watchDrugs} watchChange={id => getUserInfo(id)} />
      <ChangeUser
        src={ChangeUserIcon}
        alt="change-user"
        onClick={() => toggleChangeUserModalHandler()}
      />
      <Footer routes={props} />
      {changeUserModalShow ? (
        <ChangeUserModal
          modalOff={() => toggleChangeUserModalHandler()}
          img
          title="사용자 추가/변경"
          content={modalContent}
=======
      <Container>
        <Topbar history={props.history} />
        <UserGeneralInfo
          currentDrugsCount={currentDrugsCount}
          drugReviewsCount={drugReviewsCount}
          myConversation={myConversation}
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
>>>>>>> 9e48b1f6d5edfc1039e0c0668fd5c7bd0a95cf0f
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
