import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthStore";
import axios from "../apis";
import styled from "styled-components";

import AppendDisease from "../components/AddUserInfo/FamilyMedHistory/AppendResult";

import { Container } from "../components/UI/SharedStyles";
import { BasicButton } from "../components/UI/SharedStyles";
import Header from "../components/AddUserInfo/Header";
import Sex from "../components/AddUserInfo/Sex";
import Health from "../components/AddUserInfo/Health";
import Birthdate from "../components/AddUserInfo/Birthdate";

import Modal from "../components/UI/Modal";
import medIcon from "../assets/images/(white)med-icon.svg";
import Nickname from "../components/AddUserInfo/Nickname";

const AddInfoArea = styled(Container)`
  padding-top: 24px;
  padding-left: 1.4rem;
  padding-right: 1.4rem;
`;

const SubmitButton = styled(BasicButton)`
  width: 6.8125rem;
  height: 3rem;
  text-align: center;
`;

const SkipButton = styled(SubmitButton)`
  opacity: 0.3;
  text-align: center;
`;

const ButtonArea = styled.div`
  width: 14.8125rem;
  display: flex;
  margin-top: 1.875rem;
`;

const ModalContents = styled.div`
  height: 14.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalMessage = styled.div`
  width: 12.75rem;
  font-size: 0.875rem;
  font-weight: 800;
  color: #474747;
  margin-bottom: 38px;
`;

function AddSubUser(props) {
  const [diseaseArray, setDiseaseArray] = useState([]);
  const [userName, setUserName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [drink, setDrink] = useState(null);
  const [smoke, setSmoke] = useState(null);
  const [caffeine, setCaffeine] = useState(null);
  const [sex, setSex] = useState(null);
  const [familyMedHistory, setFamilyMedHistory] = useState([]);
  const [skipAddInfo, setSkipAddInfo] = useState(false);
  const [backgroundScrollable, setBackgroundScrollable] = useState(true);

  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    axios({
      method: "GET",
      url: "/autocomplete/disease",
      params: {
        sub_user_id: state.subUserId
      },
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    }).then(response => {
      setDiseaseArray(response.data);
    });
  }, [state.token, state.subUserId]);

  useEffect(() => {
    if (props.match.path === "/add-info") {
      if (
        props.location.search !== "" &&
        props.location.search.includes("?token=")
      ) {
        dispatch({
          type: "SIGNUP_SUCCESS",
          token: props.location.search.split("=")[1]
        });
        window.location.replace("/add-info");
      }
      getUserInfo();
    } else if (props.match.path === "/edit-info") {
      if (state.token) {
        getUserInfo();
      }
    }
  }, [
    props.match.path,
    props.match.params,
    state.subUserId,
    state.token,
    state.subUserIndex,
    dispatch
  ]);

  const getUserInfo = () => {
    axios({
      method: "GET",
      url: "/user/mypage",
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    }).then(response => {
      const payload = response.data;
      const object = payload.infos[state.subUserIndex].sub_user.basic_info;
      setUserName(object.user_name);
      setBirthDate(object.birth_date);
      setDrink(object.drink);
      setSmoke(object.smoke);
      setCaffeine(object.caffeine);
      setSex(object.sex);
      setFamilyMedHistory(
        payload.infos[state.subUserIndex].sub_user.family_med_his
      );
    });
  };

  const addInfoHandler = () => {
    if (props.match.path === "/add-sub-user") {
      axios({
        method: "POST",
        url: `/user/sub_users`,
        headers: {
          Authorization: `Bearer ${state.token}`
        },
        params: {
          user_name: userName,
          profile_image: null,
          birth_date: birthDate === "" ? null : birthDate,
          drink: drink,
          smoke: smoke,
          caffeine: caffeine,
          sex: sex
        }
      })
        .then(response => {
          const payload = response.data.auth_token;
          dispatch({
            type: "SIGNUP_SUCCESS",
            token: payload
          });
          localStorage.setItem("jwt_token", payload);
          props.history.push("/mypage");
        })
        .catch(error => {
          alert(error.data.errors);
        });
    } else if (
      props.match.path === "/add-info" ||
      props.match.path === "/edit-info"
    ) {
      axios({
        method: "PATCH",
        url: `/user/sub_users/${state.subUserId}`,
        headers: {
          Authorization: `Bearer ${state.token}`
        },
        params: {
          user_name: userName,
          profile_image: null,
          birth_date: birthDate === "" ? null : birthDate,
          drink: drink,
          smoke: smoke,
          caffeine: caffeine,
          sex: sex
        }
      })
        .then(response => {
          const payload = response.data.auth_token;
          dispatch({
            type: "SIGNUP_SUCCESS",
            token: payload
          });
          localStorage.setItem("jwt_token", payload);
          props.history.push("/mypage");
        })
        .catch(error => {
          alert(error.response.data.errors);
        });
    }
  };

  const toggleHandler = (key, value) => {
    if (key === "sex") {
      setSex(value);
    } else if (key === "drink") {
      setDrink(value);
    } else if (key === "smoke") {
      setSmoke(value);
    } else if (key === "caffeine") {
      setCaffeine(value);
    }
  };

  const toggleSkipAddInfoHandler = () => {
    setSkipAddInfo(!skipAddInfo);
  };

  const getBirthDateHandler = date => {
    setBirthDate(date);
  };

  const changeNicknameHandler = name => {
    setUserName(name);
  };

  const modalContent = (
    <ModalContents>
      <ModalMessage>
        {props.match.path === "/edit-info"
          ? "수정 창을 닫으시겠어요?"
          : "정말 투약의 맞춤화 추천 서비스를 이용하지 않으실건가요?"}
      </ModalMessage>
      <div>
        <SubmitButton onClick={() => toggleSkipAddInfoHandler()}>
          돌아가기
        </SubmitButton>
        <SkipButton onClick={() => props.history.push("/")}>
          {props.match.path === "/edit-info" ? "닫기" : "건너뛰기"}
        </SkipButton>
      </div>
    </ModalContents>
  );

  let header = "투약 맞춤화 서비스";
  let message =
    "해당 정보는 투약 맞춤화 서비스를 이용하는 데에만 사용됩니다. 해당하는 부분을 체크해주세요.";

  if (props.match.path === "/edit-info") {
    header = "내 정보 수정하기";
  } else if (props.match.path === "/add-sub-user") {
    header = "추가 사용자 정보 입력";
  }

  return (
    <AddInfoArea preventScroll={!backgroundScrollable}>
      <Header header={header} message={message} />
      <Nickname
        getNickname={name => changeNicknameHandler(name)}
        value={!userName ? "" : userName}
      />
      <Sex
        sex={sex}
        toggleHandle={(label, value) => toggleHandler(label, value)}
      />
      <Birthdate
        value={!birthDate ? "" : birthDate}
        getBirthDate={date => getBirthDateHandler(date)}
        backgroundScroll={e => setBackgroundScrollable(e)}
      />
      <Health
        drink={drink}
        smoke={smoke}
        caffeine={caffeine}
        toggleHandle={(label, value) => toggleHandler(label, value)}
      />
      <AppendDisease
        diseaseArray={diseaseArray}
        currentFamilyMedHis={familyMedHistory}
        getCurrentFamilyMedHistory={() => getUserInfo()}
      />
      <ButtonArea>
        <SubmitButton onClick={() => addInfoHandler()}>
          {props.match.path === "/edit-info" ? "수정하기" : "추가하기"}
        </SubmitButton>
        <SkipButton onClick={() => toggleSkipAddInfoHandler()}>
          {props.match.path === "/edit-info" ? "닫기" : "건너뛰기"}
        </SkipButton>
      </ButtonArea>
      {skipAddInfo ? (
        <Modal
          modalOff={() => toggleSkipAddInfoHandler()}
          img={medIcon}
          title="투약"
          content={modalContent}
        />
      ) : null}
    </AddInfoArea>
  );
}

export default AddSubUser;
