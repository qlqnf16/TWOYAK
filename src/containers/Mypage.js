import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthStore";
import styled from "styled-components";
import axios from "../apis";

import Topbar from "../components/Mypage/Topbar";
import UserGeneralInfo from "../components/Mypage/UserGeneralInfo";
import Diseases from "../components/Mypage/Diseases";
import WatchDrugs from "../components/Mypage/WatchDrugs";
import Footer from "../components/Mypage/Footer";
import ChangeUserModal from "../components/UI/Modal";
import AddDash from "../assets/images/add-dash.svg";
import ChangeUserIcon from "../assets/images/change-user-icon.svg";

const MyPageContainer = styled.div`
  width: 100%;
  padding: 20px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: white;
  overflow: auto;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  opacity: 0.1;
  background-color: var(--twoyak-blue);
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

const ChangeUser = styled.img`
  position: fixed;
  bottom: 1.4375rem;
  right: 1.4375rem;
  z-index: 300;
`;

function Mypage(props) {
  const [currentDrugs, setCurrentDrugs] = useState([]);
  const [drugReviews, setDrugReviews] = useState([]);
  const [myConversation] = useState([]);
  const [familyMedHistoies, setFamilyMedHistories] = useState([]);
  const [watchDrugs, setWatchDrugs] = useState([]);
  const [changeUserModalShow, setChangeUserModalShow] = useState(false);

  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (state.token) {
      getUserInfo(state.subUserIndex);
    }
  }, [state.token, state.subUserIndex]);

  const getUserInfo = id => {
    axios({
      method: "GET",
      url: "/user/mypage",
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    }).then(async response => {
      const payload = response.data;
      dispatch({
        type: "CHANGE_SUB_USER",
        subUserId: payload.infos[id].sub_user.basic_info.id,
        userName: payload.infos[id].sub_user.basic_info.user_name,
        subUserIndex: id
      });
      setCurrentDrugs(payload.infos[id].sub_user.current_drugs);
      setFamilyMedHistories(payload.infos[id].sub_user.family_med_his);
      setDrugReviews(payload.drug_reviews);
      setWatchDrugs(payload.watch_drugs);
    });
  };

  const toggleChangeUserModalHandler = () => {
    setChangeUserModalShow(!changeUserModalShow);
  };

  const modalContent = (
    <ModalContents>
      <ChangeFunction>
        {state.subUsers
          ? state.subUsers.map((i, k) =>
              i.id !== state.subUserId ? (
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
          onClick={() => props.history.push("/add-sub-user")}
        />
      </ChangeFunction>
    </ModalContents>
  );

  return (
    <MyPageContainer>
      <Topbar history={props.history} />
      <UserGeneralInfo
        currentDrugs={currentDrugs}
        drugReviews={drugReviews}
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
        />
      ) : null}
    </MyPageContainer>
  );
}

export default Mypage;

// Netflix fast api
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
//   const [currentDrugsCount, setCurrentDrugsCount] = useState([]);
//   const [drugReviewsCount, setDrugReviewsCount] = useState([]);
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
//       url: "/user/mypage/test",
//       headers: {
//         Authorization: `Bearer ${state.token}`
//       }
//     }).then(async response => {
//       const payload = response.data;
//       console.log(payload);
//       dispatch({
//         type: "CHANGE_SUB_USER",
//         subUserId: payload.included[id].id,
//         userName: payload.included[id].attributes.user_name,
//         subUserIndex: id
//       });
//       setCurrentDrugsCount(payload.included[id].meta.current_drugs_count);
//       setDrugReviewsCount(payload.data.meta.drug_reviews_count);
//       setFamilyMedHistories(payload.included[id].meta.family_med_histories);
//       console.log(payload.included[id].meta.family_med_histories);
//       setWatchDrugs(payload.data.meta.watch_drugs);
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
//         currentDrugsCount={currentDrugsCount}
//         drugReviewsCount={drugReviewsCount}
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
