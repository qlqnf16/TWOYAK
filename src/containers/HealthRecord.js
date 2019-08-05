import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthStore";
import axios from "../apis";
import styled from "styled-components";

import CurrentDrugList from "../components/HealthRecord/Current/CurrentDrugList";
import PastDrugList from "../components/HealthRecord/Past/PastDrugList";
import AddCard from "../components/HealthRecord/AddCard";
import Warning from "../components/UI/Warning";
import { BasicText, Line } from "../components/UI/SharedStyles";
import LoginModal from "../components/UI/LoginModal";

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
  cursor: ${props => (props.active ? "none" : "pointer")};
`;
const UserContainer = styled.div`
  width: 88%;
  margin: 1.25rem auto 2rem auto;
  text-align: center;
`;

const TopLine = styled(Line)`
  margin: 0.8rem 0;
`;

const Margin = styled.div`
  margin: 1rem;
`;

function HealthRecord() {
  const { state: authState } = useContext(AuthContext);

  const [currentDrugs, setCurrentDrugs] = useState(null);
  const [pastDrugs, setPastDrugs] = useState(null);
  const [durInfo, setDurInfo] = useState(null);
  const [subUserInfo, setSubUserInfo] = useState();

  const [showCurrent, setShowCurrent] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => { }, [currentDrugs]);

  useEffect(() => {
    if (authState.token) {
      getUserInfo();
      getSubUserInfo();
      setShowLoginModal(false);
    } else {
      setShowLoginModal(true);
    }
  }, [authState]);

  const loadingHandler = async (past) => {
    if (!past) {
      const { data } = await getInfos(`/current_drugs`)
      setCurrentDrugs(data)
    } else {
      const { data } = await getInfos('/past_drugs');
      setPastDrugs(data);
    }
  };

  const getInfos = url =>
    axios.get(`user/${authState.subUserId}/${url}`, {
      headers: {
        Authorization: `bearer ${authState.token}`
      }
    });

  const getSubUserInfo = async () => {
    try {
      const { data } = await axios.get(
        `user/sub_users/${authState.subUserId}`,
        {
          headers: {
            Authorization: authState.token
          }
        }
      );
      setSubUserInfo(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserInfo = async () => {
    try {
      const [
        { data: myPast },
        { data: myCurrent },
        { data: myDur }
      ] = await Promise.all([
        getInfos("past_drugs"),
        getInfos("current_drugs"),
        getInfos("analysis/get")
      ]);
      setCurrentDrugs(myCurrent);
      setPastDrugs(myPast);
      if (myDur.duplicate || myDur.interactions || myDur.same_ingr) {
        setDurInfo({
          duplicate: myDur.duplicate,
          interactions: myDur.interactions,
          same_ingr: myDur.same_ingr
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const currentPastToggle = () => {
    setShowCurrent(!showCurrent);
  };

  const drugToPast = async id => {
    try {
      await axios.delete(
        `user/${authState.subUsers[0].id}/current_drugs/${id}/to_past`,
        {
          headers: {
            Authorization: `bearer ${authState.token}`
          }
        }
      );
      getUserInfo();
      setShowCurrent(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDrug = async (id, past) => {
    const url = !past ? 'current_drugs' : 'past_drugs'
    try {
      await axios.delete(
        `user/${authState.subUsers[0].id}/${url}/${id}`,
        {
          headers: {
            Authorization: `bearer ${authState.token}`
          }
        }
      );
      loadingHandler();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Background />
      <Container>
        {showLoginModal && <LoginModal />}
        <NavContainer>
          <Nav onClick={currentPastToggle} active={showCurrent}>
            현재 복용
          </Nav>
          <Nav onClick={currentPastToggle} active={!showCurrent}>
            과거 복용
          </Nav>
        </NavContainer>
        <Margin>
          <Warning />
        </Margin>
        <UserContainer>
          <TopLine />
          <BasicText size="0.7rem" bold>
            <BasicText color="var(--twoyak-blue)">
              '{authState.userName}'{" "}
            </BasicText>
            의 복용내역
          </BasicText>
          <TopLine />
        </UserContainer>
        {showCurrent
          ? currentDrugs && (
            <CurrentDrugList
              currentDrugs={currentDrugs}
              loadingHandler={loadingHandler}
              drugToPast={drugToPast}
              deleteDrug={deleteDrug}
              durInfo={durInfo}
              subUserInfo={subUserInfo}
            />
          )
          : pastDrugs && <PastDrugList drugs={pastDrugs} deleteDrug={deleteDrug} loadingHandler={loadingHandler} />}
        <AddCard
          text={
            showCurrent
              ? "복용중이신 약을 추가해보세요!"
              : ["복용이 끝나신 약을", <br />, "추가해보세요!"]
          }
        />
      </Container>
    </>
  );
}

export default HealthRecord;
