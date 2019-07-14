import React, { useEffect, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthStore';
import axios from '../apis';
import styled from 'styled-components';

import AutoSuggestion from "../components/Util/AutoSuggestion";
import { Container } from '../components/UI/SharedStyles';
import { Line } from '../components/UI/SharedStyles';
import { BasicButton } from '../components/UI/SharedStyles';
import { BasicInput } from '../components/UI/SharedStyles';
import Modal from '../components/UI/Modal';
import medIcon from "../assets/images/(white)med-icon.svg";
import DatePicker from "../components/UI/DatePicker";

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

const SelectSex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 5rem;
  justify-content: space-evenly;
`

const SelectHealthInfo = styled(SelectSex)`
  height: 16rem;
  justify-content: space-evenly;
  margin-bottom: 12px;
`

const InfoCategory = styled.div`
  width: auto;
  font-size: 0.875rem;
  font-weight: 800;
  height: 1rem;
  opacity: 0.6;
  color: var(--twoyak-blue);
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

const InfoDescription = styled.div`
  font-size: 0.75rem;
  opacity: 0.8;
  color: #757575;
`

const SubmitButton = styled(BasicButton)`
  width: 6.8125rem;
  height: 3rem;
  text-align: center;
`

const SkipButton = styled(SubmitButton)`
  opacity: 0.3;
  text-align: center;
`

const DiseaseInfoCategory = styled(InfoCategory)`
  width: 11rem;
  height: auto;
  text-align: center;
  margin-bottom: 20px;
`

const DiseaseInput = styled(BasicInput)`
  width: 16.5rem;
  margin-bottom: 24px;
`

const ButtonArea = styled.div`
  width: 14.8125rem;
  display: flex;
`

const ModalContents = styled.div`
  height: 14.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ModalMessage = styled.div`
  width: 12.75rem;
  font-size: 0.875rem;
  font-weight: 800;
  color: #474747;
  margin-bottom: 38px;
`

function AddInfo(props) {
  const [diseaseArray, setDiseaseArray] = useState([]);
  const [diseaseSelectedNameArray, setDiseasesNameSelectedArray] = useState([]);
  const [diseasesSeletedIdArray, setDiseasesIdSelecetedArray] = useState([]);
  const [userName, setUserName] = useState(null);
  const [birthDate, setBirthDate] = useState('');
  const [drink, setDrink] = useState(null);
  const [smoke, setSmoke] = useState(null);
  const [caffeine, setCaffeine] = useState(null);
  const [sex, setSex] = useState(null);
  const [birthDateModal, setBirthDateModal] = useState(false);
  const [skipAddInfo, setSkipAddInfo] = useState(false);

  const { state, dispatch } = useContext(AuthContext);


  const AddInfoArea = styled(Container)`
    padding-top: 24px;
    padding-left: 1.4rem;
    padding-right: 1.4rem;
    position: ${birthDateModal ? 'fixed' : 'static'};
    overflow: ${birthDateModal ? 'hidden' : 'visible'};
  `

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/autocomplete/disease'
    }).then(response => {
      setDiseaseArray(response.data)
    }
    )
  }, [])
  
  const addInfoHandler = () => {
    axios({
      method: 'PATCH',
      url: `/user/sub_users/${state.subUserId}`,
      headers: {
        'Authorization': `Bearer ${state.token}`
      },
      params: {
        user_name: userName,
        profile_image: null,
        birth_date: birthDate === '' ? null : birthDate,
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
      })
      localStorage.setItem('token', payload)
      props.history.push('/')
    }
    );
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

  const toggleSkipAddInfoHandler = () => {
    setSkipAddInfo(!skipAddInfo)
  }

  const toggleBirthDateModalHandler = () => {
    setBirthDateModal(!birthDateModal)
  }

  const changeBirthDateHandler = (date) => {
    setBirthDate(date);
  }

  const appendDiseasesIdHandler = (id, name) => {
    let id_array = diseasesSeletedIdArray;
    let name_array = diseaseSelectedNameArray;
    id_array.push(id);
    name_array.push(name);
    setDiseasesIdSelecetedArray(id_array);
    setDiseasesNameSelectedArray(name_array);
  }

  const modalContent = (
    <ModalContents>
      <ModalMessage>
        정말 투약의 맞춤화 추천 서비스를 이용하지 않으실건가요?
      </ModalMessage>
      <div>
        <SubmitButton
          onClick={() => toggleSkipAddInfoHandler()}
        >
          돌아가기
        </SubmitButton>
        <SkipButton
          onClick={() => props.history.push('/')}
        >
          건너뛰기
        </SkipButton>
      </div>
    </ModalContents>
  )

  return (
    <AddInfoArea>
      <div>
        <AddInfoHeader>
          투약 맞춤화 서비스
        </AddInfoHeader>
        <Divider />
        <AddInfoMessage>
          {state.userName} 님을 위한 투약 맞춤화 추천 서비스 받아보시겠어요? 아래 정보를 제출해주시면 맞춤화 건강 서비스를 제공받으실 수 있습니다.
        </AddInfoMessage>
      </div>
      <SelectSex>
        <InfoCategory>
          성별
        </InfoCategory>
        <SelectArea>
          <SelectCircle
            onClick={() => toggleHandler('sex', true)} 
            style={ sex ? {backgroundColor: 'var(--twoyak-blue)', color: '#ffffff'} : {backgroundColor: 'transparent'}}>
              남
            </SelectCircle>
          <SelectCircle 
            onClick={() => toggleHandler('sex', false)} 
            style={ sex === false ? {backgroundColor: 'var(--twoyak-blue)', color: '#ffffff'} : {backgroundColor: 'transparent'}}>
              여
            </SelectCircle>
        </SelectArea>
      </SelectSex>
      <SelectHealthInfo>
        <InfoCategory>
          건강정보
        </InfoCategory>
        <InfoDescription>
          평소에 술을 많이 드시나요?
        </InfoDescription>
        <SelectArea>
          <SelectCircle 
            onClick={() => toggleHandler('drink', true)} 
            style={ drink ? {backgroundColor: 'var(--twoyak-blue)', color: '#ffffff'} : {backgroundColor: 'transparent'}}>
            YES
          </SelectCircle>
          <SelectCircle 
            onClick={() => toggleHandler('drink', false)} 
            style={ drink === false ? {backgroundColor: 'var(--twoyak-blue)', color: '#ffffff'} : {backgroundColor: 'transparent'}}>
            NO
          </SelectCircle>
        </SelectArea>
        <InfoDescription>
          흡연자이신가요?
        </InfoDescription>
        <SelectArea>
          <SelectCircle 
            onClick={() => toggleHandler('smoke', true)} 
            style={ smoke ? {backgroundColor: 'var(--twoyak-blue)', color: '#ffffff'} : {backgroundColor: 'transparent'}}>
            YES
          </SelectCircle>
          <SelectCircle 
            onClick={() => toggleHandler('smoke', false)} 
            style={ smoke === false ? {backgroundColor: 'var(--twoyak-blue)', color: '#ffffff'} : {backgroundColor: 'transparent'}}>
            NO
          </SelectCircle>
        </SelectArea>
        <InfoDescription>
          카페인 음료를 많이 섭취하시나요?
        </InfoDescription>
        <SelectArea>
          <SelectCircle 
            onClick={() => toggleHandler('caffeine', true)} 
            style={ caffeine ? {backgroundColor: 'var(--twoyak-blue)', color: '#ffffff'} : {backgroundColor: 'transparent'}}>
            YES
          </SelectCircle>
          <SelectCircle 
            onClick={() => toggleHandler('caffeine', false)} 
            style={ caffeine === false ? {backgroundColor: 'var(--twoyak-blue)', color: '#ffffff'} : {backgroundColor: 'transparent'}}>
            NO
          </SelectCircle>
        </SelectArea>
      </SelectHealthInfo>
      <DiseaseInfoCategory>
        생년월일
      </DiseaseInfoCategory>
      <DiseaseInput
        type='text'
        placeholder='ex) 1985-06-15'
        value={birthDate}
        onClick={() => toggleBirthDateModalHandler()}
        readOnly
      />
      <DiseaseInfoCategory>
        가족력이 있으시면 입력해주세요.
      </DiseaseInfoCategory>
      <AutoSuggestion
        search="disease"
        diseaseSearchTerms={diseaseArray}
        placeholderProp={"ex) 두통, 복통"}
        searchKey="name"
        appendDiseasesId={(id, name) => appendDiseasesIdHandler(id, name)}
      />
      <ButtonArea>
        <SubmitButton 
          onClick={() => addInfoHandler()}>
          제출
        </SubmitButton>
        <SkipButton 
          onClick={() => toggleSkipAddInfoHandler()}>
          건너뛰기
        </SkipButton>
      </ButtonArea>
      {skipAddInfo 
        ? <Modal 
            modalOff={() => toggleSkipAddInfoHandler()}
            img={medIcon}
            title='투약'
            content={modalContent}
          /> 
        : null}
      {birthDateModal
        ? <Modal
            modalOff={() => toggleBirthDateModalHandler()}
            img={medIcon}
            title='생년월일 입력'
            content={
              <DatePicker
                getDate={(date) => changeBirthDateHandler(date)}
                modalOff={() => toggleBirthDateModalHandler()}
              />
            }
          />
        : null
      }
    </AddInfoArea>
  )
};

export default AddInfo;