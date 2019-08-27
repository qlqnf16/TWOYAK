import React, { useState, useReducer, useEffect, useContext } from "react";
import Modal from "../../UI/Modals/Modal";
import AutoSuggestion from "../../Util/AutoSuggestion";
import { ko } from "date-fns/esm/locale";
import { AuthContext } from "../../../contexts/AuthStore";
import { DrugContext } from "../../../contexts/DrugStore";
import axios from "../../../apis";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import moment from "moment";

import styled from "styled-components";
import {
  BasicText,
  BasicButton,
  AutosuggestStyleWrapper
} from "../../UI/SharedStyles";

const Container = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 4rem;
  border-radius: 1.5rem;
  border: solid 1px var(--twoyak-blue);
  padding: 1rem;
  resize: none;
  margin-top: 1rem;
`;

const Button = styled(BasicButton)`
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const FakeInput = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.5rem;
  border: solid 1px var(--twoyak-blue);
  padding: 1rem;
  margin: 1rem 0;
  font-size: 0.7rem;
  color: #474747;
`;

const DatePickerContainer = styled.div`
  position: absolute;
  top: 3rem;
  left: -1rem;
  width: 110%;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding-bottom: 1rem;
`;

const StyledDateRange = styled(DateRange)`
  width: 100%;
  & .rdrMonth {
    width: 100%;
  }
`;

const AddModal = ({ additionalModalToggle, addCurrentDrug, drugId }) => {
  const [disease, setDisease] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [from, setFrom] = useState(moment());
  const [to, setTo] = useState(moment());
  const [memo, setMemo] = useState()
  const { state: authState } = useContext(AuthContext);
  const { state: drugState, dispatch } = useContext(DrugContext);

  useEffect(() => {
    !drugState.diseases && fetchDiseaseData();
    console.log(drugId)
  }, [drugId]);

  const fetchDiseaseData = async () => {
    const { data } = await axios.get("autocomplete/disease", {
      headers: { Authorization: `bearer ${authState.token}` },
      params: { sub_user_id: authState.subUserId }
    });
    const payload = data.my_diseases ? data.my_diseases.concat(data.standard_diseases) : data.standard_diseases;
    dispatch({ type: "GET_DISEASES", payload: payload });
  };

  const diseasesInputChange = value => {
    setDisease(value);
  };

  const addDisease = async value => {
    try {
      const response = await axios.post(`/user/${authState.subUserId}/diseases`, {
        disease: {
          name: value
        }
      }, {
          headers: {
            Authorization: `bearer ${authState.token}`
          }
        })
      fetchDiseaseData()
      setDisease({ id: response.data.id, name: response.data.name })
    } catch (error) {
      console.log(error)
    }
  }

  const addDrug = () => {
    const diseaseName = disease.name ? disease.name : disease;
    const formattedFrom = from.format("YYYY-MM-DD");
    const formattedTo = to.format("YYYY-MM-DD");
    const memoToSend = memo
    console.log(disease)
    if (disease) addCurrentDrug(drugId, { diseaseName, formattedFrom, formattedTo, memoToSend });
    else alert('질병추가해라')
  };

  const selectionRange = {
    startDate: from,
    endDate: to,
    key: "selection"
  };

  const handleSelect = ranges => {
    setFrom(moment(ranges.selection.startDate));
    setTo(moment(ranges.selection.endDate));
  };

  return !drugState ? (
    ""
  ) : (
      <Modal
        title="복용 목록에 추가"
        content={
          <Container>
            <BasicText>왜 이 약을 드시나요?</BasicText>
            <AutosuggestStyleWrapper>
              <AutoSuggestion
                search="disease"
                placeholderProp={"질환명 입력"}
                searchKey="name"
                inputChange={diseasesInputChange}
                inputAdd={addDisease}
              />
            </AutosuggestStyleWrapper>
            <>
              {" "}
              <BasicText>기간</BasicText>
              <FakeInput
                onClick={() => {
                  setShowDatePicker(true);
                }}
              >
                {from.format("YYYY/MM/DD")} - {to.format("YYYY/MM/DD")}
              </FakeInput>
              {showDatePicker && (
                <DatePickerContainer>
                  <StyledDateRange
                    locale={ko}
                    months={1}
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                    showSelectionPreview={false}
                  />
                  <BasicButton
                    onClick={() => {
                      setShowDatePicker(false);
                    }}
                  >
                    완료
                </BasicButton>
                </DatePickerContainer>
              )}
              <BasicText>메모</BasicText>
              <TextArea onChange={(e) => setMemo(e.target.value)} placeholder="ex) 하루에 언제 몇 알 씩 먹는지, 상세 복용 규칙 등을 기록해보세요" />
            </>

            <Button
              onClick={() => {
                addDrug();
              }}
            >
              완료
          </Button>
          </Container>
        }
        modalOff={() => {
          additionalModalToggle("add");
        }}
      />
    );
};

export default AddModal;
