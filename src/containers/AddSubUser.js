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
  const [skipAddInfo, setSkipAddInfo] = useState(false);

  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    axios({
      method: "GET",
      url: "/autocomplete/disease"
    }).then(response => {
      setDiseaseArray(response.data);
    });
  }, []);

  const addInfoHandler = () => {
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
    }).then(response => {
      const payload = response.data.auth_token;
      dispatch({
        type: "SIGNUP_SUCCESS",
        token: payload
      });
      localStorage.setItem("token", payload);
      props.history.push("/");
    });
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
        정말 투약의 맞춤화 추천 서비스를 이용하지 않으실건가요?
      </ModalMessage>
      <div>
        <SubmitButton onClick={() => toggleSkipAddInfoHandler()}>
          돌아가기
        </SubmitButton>
        <SkipButton onClick={() => props.history.push("/")}>
          건너뛰기
        </SkipButton>
      </div>
    </ModalContents>
  );

  return (
    <AddInfoArea>
      <Header
        header="추가 사용자 정보 입력"
        message="추가 사용자의 정보를 입력해주세요."
      />
      <Nickname
        getNickname={name => changeNicknameHandler(name)}
        value={userName}
      />
      <Sex
        sex={sex}
        toggleHandle={(label, value) => toggleHandler(label, value)}
      />
      <Birthdate
        value={birthDate}
        getBirthDate={date => getBirthDateHandler(date)}
      />
      <Health
        drink={drink}
        smoke={smoke}
        caffeine={caffeine}
        toggleHandle={(label, value) => toggleHandler(label, value)}
      />
      <AppendDisease diseaseArray={diseaseArray} />
      <ButtonArea>
        <SubmitButton onClick={() => addInfoHandler()}>추가하기</SubmitButton>
        <SkipButton onClick={() => toggleSkipAddInfoHandler()}>
          건너뛰기
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
