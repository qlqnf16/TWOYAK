import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthStore";
import styled from "styled-components";
import axios from "../apis";

import Topbar from "../components/Mypage/Topbar";
import UserGeneralInfo from "../components/Mypage/UserGeneralInfo";
import DiseasesAndExtra from "../components/Mypage/DiseasesAndExtra";
import WatchDrugs from "../components/Mypage/WatchDrugs";

const MyPageContainer = styled.div`
  width: 100%;
  padding: 20px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: white;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  opacity: 0.1;
  background-color: var(--twoyak-blue);
`;

function Mypage(props) {
  const [currentDrugs, setCurrentDrugs] = useState([]);
  const [drugReviews, setDrugReviews] = useState([]);
  const [myConversation, setMyConversation] = useState([]);
  const [currentDiseases, setCurrentDiseases] = useState([]);
  const [watchDrugs, setWatchDrugs] = useState([]);

  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (state.token) {
      getUserInfo(state.subUserIndex);
    }
  }, [state.token]);

  const getUserInfo = id => {
    axios({
      method: "GET",
      url: "/user/mypage",
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    }).then(response => {
      const payload = response.data;
      dispatch({
        type: "CHANGE_SUB_USER",
        subUserId: payload.infos[id].sub_user.basic_info.id,
        userName: payload.infos[id].sub_user.basic_info.user_name,
        subUserIndex: id
      });
      setCurrentDrugs(payload.infos[id].sub_user.current_drugs);
      setDrugReviews(payload.drug_reviews);
      setCurrentDiseases(payload.infos[id].sub_user.current_diseases);
      setWatchDrugs(payload.watch_drugs);
    });
  };

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
      <DiseasesAndExtra currentDiseases={currentDiseases} />
      <Divider />
      <WatchDrugs watchDrugs={watchDrugs} />
    </MyPageContainer>
  );
}

export default Mypage;
