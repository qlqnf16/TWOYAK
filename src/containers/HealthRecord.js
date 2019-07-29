import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthStore";
import axios from "../apis";
import styled from "styled-components";

import CurrentDrugList from "../components/HealthRecord/CurrentDrugList";
import PastDrugList from "../components/HealthRecord/PastDrugList";
import AddCard from "../components/HealthRecord/AddCard";
import Warning from "../components/UI/Warning";
import Modal from "../components/UI/Modal";
import { BasicText, BasicButton, Line } from "../components/UI/SharedStyles";

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

const ModalContainer = styled.div`
  padding: 2.5rem 0;
  text-align: center;
`;

const Text = styled(BasicText)`
  display: block;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2.5rem;
  font-size: 0.875rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

function HealthRecord() {
  const { state: authState } = useContext(AuthContext);

  const [currentDrugs, setCurrentDrugs] = useState(null);
  const [pastDrugs, setPastDrugs] = useState(null);
  const [durInfo, setDurInfo] = useState(null);
  const [subUserInfo, setSubUserInfo] = useState();

  const [showCurrent, setShowCurrent] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {}, [currentDrugs]);

  useEffect(() => {
    if (authState.token) {
      getUserInfo();
      getSubUserInfo();
      setShowLoginModal(false);
    } else {
      setShowLoginModal(true);
    }
  }, [authState]);

  const loadingHandler = async () => {
    const { data } = await getInfos(`/current_drugs`);
    setCurrentDrugs(data);
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
        {showLoginModal && (
          <Modal
            title="투약"
            modalOff={() => {}}
            content={
              <ModalContainer>
                <Text>
                  로그인하시면 이용 가능한
                  <br />
                  투약의 맞춤형 관리서비스 입니다
                </Text>
                <BasicButton>
                  <StyledLink to="/login">로그인 하러가기</StyledLink>
                </BasicButton>
              </ModalContainer>
            }
          />
        )}
        <NavContainer>
          <Nav onClick={currentPastToggle} active={showCurrent}>
            현재 복용
          </Nav>
          <Nav onClick={currentPastToggle} active={!showCurrent}>
            과거 복용
          </Nav>
        </NavContainer>
        <Warning />
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
          : pastDrugs && <PastDrugList drugs={pastDrugs} />}
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
