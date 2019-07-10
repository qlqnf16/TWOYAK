import React, { useEffect, usetState, useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthStore';
import axios from '../apis';
import jwt_decode from 'jwt-decode';
import styled from 'styled-components';

import { Container } from '../components/UI/SharedStyles';
import { Line } from '../components/UI/SharedStyles';
import { BasicButton } from '../components/UI/SharedStyles';
import { BasicInput } from '../components/UI/SharedStyles';

const AddInfoArea = styled(Container)`
  padding-top: 3.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`

const Divider = styled(Line)`
  width: 100%;
  margin-top: 0.375rem;
  margin-bottom: 0.125rem;
`

const AddInfoHeader = styled.div`
  color: var(--twoyak-blue);
  font-size: 1.125rem;
  font-weight: 800;
  letter-spacing: -0.0268rem;
`

const AddInfoMessage = styled.div`
  color: #757575;
  opacity: 0.7;
  font-size: 11px;
`

const SelectArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 94px;
  margin-top: 0.3437rem;
  margin-bottom: 0.3437rem;
`

const SelectCircle = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border: solid 1px #b1e2ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  color: #757575;
`

const InfoCategory = styled.div`
  width: auto;
  font-size: 0.875rem;
  font-weight: blod;
  height: 1rem;
  opacity: 0.6;
  color: var(--twoyak-blue);
  margin-top: 1.6875rem;
  margin-bottom: 0.3437rem;
`

const InfoDescription = styled.div`
  font-size: 0.75rem;
  opacity: 0.8;
  color: #757575;
  margin-bottom: 0.3437rem;
`

const SubmitButton = styled(BasicButton)`
  width: 6.8125rem;
  height: 3rem;
`

const SkipButton = styled(SubmitButton)`
  opacity: 0.3;
`

function AddInfo(props) {
  const [userName, setUserName] = useState('재키');
  const [birthDate, setBirthDate] = useState(null);
  const [drink, setDrink] = useState(null);
  const [smoke, setSmoke] = useState(null);
  const [caffeine, setCaffeine] = useState(null);
  const [sex, setSex] = useState(null);

  const { state, dispatch } = useContext(AuthContext);
  
  const addInfoHandler = () => {
    console.log(state)
    axios({
      method: 'PATCH',
      url: `/user/user_infos/${state.userInfoId}`,
      headers: {
        'Authorization': `Bearer ${state.token}`
      },
      params: {
        user_name: userName,
        profile_image: null,
        birth_date: birthDate,
        drink: drink,
        smoke: smoke,
        caffeine: caffeine,
        sex: sex,
      }
    })
    .then(response => {
      const payload = response.data.auth_token;
      dispatch({
        type: "SIGNUP_SUCCESS",
        token: payload,
        userId: jwt_decode(payload).user.id,
        userName: jwt_decode(payload).user.user_name,
        userInfoId: jwt_decode(payload).user.user_info_id,
      })
      localStorage.setItem('token', payload)
    }
    )
  };

  const toggleHandler = (key, value) => {
    if (key === 'sex') {
      setSex(value);
    } else if (key === 'drink') {
      setDrink(value);
    } else if (key === 'smoke') {
      setSmoke(value);
    } else if (key === 'caffeine') {
      setCaffeine(value);
    }
  };

  const skipAddInfo = () => {
    props.history.push('/')
  }

  return (
    <AddInfoArea>
      <div>
        <AddInfoHeader>투약 맞춤화 서비스</AddInfoHeader>
        <Divider />
        <AddInfoMessage>해당 정보는 투약 맞춤화 추천 서비스를 이용하는데에만 사용됩니다. 해당 되시는 부분에 체크해주세요.</AddInfoMessage>
      </div>
      <InfoCategory>성별</InfoCategory>
      <SelectArea>
        <SelectCircle onClick={() => toggleHandler('sex', true)} style={ sex ? {backgroundColor: 'var(--twoyak-blue)', color: '#ffffff'} : {backgroundColor: 'transparent'}}>남</SelectCircle>
        <SelectCircle onClick={() => toggleHandler('sex', false)} style={ sex === false ? {backgroundColor: 'var(--twoyak-blue)', color: '#ffffff'} : {backgroundColor: 'transparent'}}>여</SelectCircle>
      </SelectArea>
      <InfoCategory>건강정보</InfoCategory>
      <InfoDescription>평소에 술을 많이 드시나요?</InfoDescription>
      <SelectArea>
        <SelectCircle onClick={() => toggleHandler('drink', true)} style={ drink ? {backgroundColor: 'var(--twoyak-blue)', color: '#ffffff'} : {backgroundColor: 'transparent'}}>YES</SelectCircle>
        <SelectCircle onClick={() => toggleHandler('drink', false)} style={ drink === false ? {backgroundColor: 'var(--twoyak-blue)', color: '#ffffff'} : {backgroundColor: 'transparent'}}>NO</SelectCircle>
      </SelectArea>
      <InfoDescription>흡연자이신가요?</InfoDescription>
      <SelectArea>
        <SelectCircle onClick={() => toggleHandler('smoke', true)} style={ smoke ? {backgroundColor: 'var(--twoyak-blue)', color: '#ffffff'} : {backgroundColor: 'transparent'}}>YES</SelectCircle>
        <SelectCircle onClick={() => toggleHandler('smoke', false)} style={ smoke === false ? {backgroundColor: 'var(--twoyak-blue)', color: '#ffffff'} : {backgroundColor: 'transparent'}}>NO</SelectCircle>
      </SelectArea>
      <InfoDescription>카페인 음료를 많이 섭취하시나요?</InfoDescription>
      <SelectArea>
        <SelectCircle onClick={() => toggleHandler('caffeine', true)} style={ caffeine ? {backgroundColor: 'var(--twoyak-blue)', color: '#ffffff'} : {backgroundColor: 'transparent'}}>YES</SelectCircle>
        <SelectCircle onClick={() => toggleHandler('caffeine', false)} style={ caffeine === false ? {backgroundColor: 'var(--twoyak-blue)', color: '#ffffff'} : {backgroundColor: 'transparent'}}>NO</SelectCircle>
      </SelectArea>
      <BasicInput
        type='text'
        placeholder='ex) 두통, 복통'
      />
      <div>
        <SubmitButton onClick={() => addInfoHandler()}>제출</SubmitButton>
        <SkipButton onClick={() => skipAddInfo()}>건너뛰기</SkipButton>
      </div>
    </AddInfoArea>
  )
};

export default AddInfo;