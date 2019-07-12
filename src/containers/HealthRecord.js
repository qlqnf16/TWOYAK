import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthStore";
import styled from "styled-components";
import axios from "../apis";
import CurrentDrugList from "../components/HealthRecord/CurrentDrugList";
import PastDrugList from "../components/HealthRecord/PastDrugList";
import Warning from "../components/UI/Warning";

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

function HealthRecord() {
  const [currentDrugs, setCurrentDrugs] = useState(null);
  const [pastDrugs, setPastDrugs] = useState(null);
  const [durInfo, setDurInfo] = useState(null);
  const [showCurrent, setShowCurrent] = useState(true);
  const { state: authState } = useContext(AuthContext);

  useEffect(() => {}, [currentDrugs]);

  useEffect(() => {
    if (authState.token) {
      getUserInfo();
    }
  }, [authState]);

  const loadingHandler = async () => {
    const { data } = await getInfos(`/current_drugs`);
    setCurrentDrugs(data);
  };

  const getInfos = url =>
    axios.get(`user/${authState.subUsers[0].id}/${url}`, {
      headers: {
        Authorization: `bearer ${authState.token}`
      }
    });

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
      // console.log(myCurrent);
      // console.log(myPast);
      console.log(myDur);
      setCurrentDrugs(myCurrent);
      setPastDrugs(myPast);
      setDurInfo({
        duplicate: myDur.duplicate,
        interactions: myDur.interactions,
        same_ingr: myDur.same_ingr
      });
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

  const deleteDrug = async id => {
    try {
      await axios.delete(
        `user/${authState.subUsers[0].id}/current_drugs/${id}`,
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
        <NavContainer>
          <Nav onClick={currentPastToggle} active={showCurrent}>
            현재 복용
          </Nav>
          <Nav onClick={currentPastToggle} active={!showCurrent}>
            과거 복용
          </Nav>
        </NavContainer>
        <Warning />
        {showCurrent
          ? currentDrugs && (
              <CurrentDrugList
                currentDrugs={currentDrugs}
                loadingHandler={loadingHandler}
                drugToPast={drugToPast}
                deleteDrug={deleteDrug}
                durInfo={durInfo}
              />
            )
          : pastDrugs && <PastDrugList drugs={pastDrugs} />}
      </Container>
    </>
  );
}

export default HealthRecord;
