import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthStore";
import styled from "styled-components";
import axios from "../apis";

import Topbar from "../components/Mypage/Topbar";
import UserGeneralInfo from "../components/Mypage/UserGeneralInfo";

const MyPageContainer = styled.div`
  width: 100%;
  padding: 20px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: white;
`

function Mypage() {
  const [currentDrugs, setCurrentDrugs] = useState([]);
  const [drugReviews, setDrugReviews] = useState([]);
  const [myConversation, setMyConversation] = useState([]);
  const [currentDiseases, setCurrentDiseases] = useState([]);
  const [watchDrugs, setWatchDrugs] = useState([]);

  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (state.token) {
      getUserInfo()
    }
  }, [state])


  const getUserInfo = () => {
    axios({
      method: 'GET',
      url: '/user/mypage',
      headers: {
        'Authorization': `Bearer ${state.token}`
      }
    })
    .then(response => {
      const payload = response.data;
      setCurrentDrugs(payload.infos[0].sub_user.current_drugs);
      setDrugReviews(payload.drug_reviews);
      setCurrentDiseases(payload.infos[0].sub_user.current_diseases);
      setWatchDrugs(payload.watch_drugs);
    })
  }

  return (
    <MyPageContainer>
      <Topbar />
      <UserGeneralInfo
        currentDrugs={currentDrugs}
        drugReviews={drugReviews}
        myConversation={myConversation}
      />
    </MyPageContainer>
  );
}

export default Mypage;
