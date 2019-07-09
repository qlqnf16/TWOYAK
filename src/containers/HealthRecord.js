import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthStore";
import styled from "styled-components";
import axios from "../apis";
import CurrentDrugList from "../components/HealthRecord/CurrentDrugList";
import PastDrugList from "../components/HealthRecord/PastDrugList";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f0f9ff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Container = styled.div`
  padding-top: 83px;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 1px 2px 7px 1px rgba(212, 212, 212, 0.5);
`;

const Nav = styled.div.attrs(props => props.active)`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.active ? "#00c3ff" : "#fff")};
  color: ${props => (props.active ? "#fff" : "#969696")};
  pointer-events: ${props => props.active && "none"};
  padding: 0.7rem;
  font-weight: 800;
`;

const Notice = styled.div`
  opacity: 0.6;
  font-size: 0.5rem;
  color: #474747;
  margin: 1rem auto;
  text-align: center;
`;

function HealthRecord() {
  const [currentDrugs, setCurrentDrugs] = useState(null);
  const [pastDrugs, setPastDrugs] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [showCurrent, setShowCurrent] = useState(true);
  const { state: authState } = useContext(AuthContext);

  useEffect(() => {}, [reviews]);

  useEffect(() => {
    if (authState.token) {
      getUserInfo();
    }
  }, [authState]);

  const loadingHandler = async () => {
    const { data } = await getInfos(`mypage`);
    setReviews(data.drug_reviews);
  };

  const getInfos = url =>
    axios.get(`user/${url}`, {
      headers: {
        Authorization: `bearer ${authState.token}`
      }
    });

  const getUserInfo = async () => {
    try {
      const [
        // { data: myPast },
        { data: myCurrent },
        { data: myReviews }
      ] = await Promise.all([
        // getInfos(`${authState.userId}/past_drugs`),
        getInfos(`${authState.userId}/current_drugs`),
        getInfos("mypage")
      ]);
      console.log(myCurrent);
      // console.log(myPast);
      setCurrentDrugs(myCurrent);
      // setPastDrugs(myPast);
      setReviews(myReviews.drug_reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const CurrentPastToggle = () => {
    setShowCurrent(!showCurrent);
  };

  return (
    <>
      <Background />
      <Container>
        <NavContainer>
          <Nav onClick={CurrentPastToggle} active={showCurrent}>
            현재 복용
          </Nav>
          <Nav onClick={CurrentPastToggle} active={!showCurrent}>
            과거 복용
          </Nav>
        </NavContainer>
        <Notice>
          투약은 식약처 공공데이터를 이용하여 의약품 안정정보 등을 제공하고
          있으며,
          <br /> 이러한 정보는 단순 참조용으로 서비스 제공자는 어떠한 법적
          책임도 지지 않습니다.
        </Notice>
        {showCurrent
          ? currentDrugs &&
            reviews && (
              <CurrentDrugList
                currentDrugs={currentDrugs}
                reviews={reviews}
                loadingHandler={loadingHandler}
              />
            )
          : pastDrugs && <PastDrugList />}
      </Container>
    </>
  );
}

export default HealthRecord;
