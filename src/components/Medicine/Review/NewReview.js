import React, { useState, useEffect, useContext } from "react";
import axios from '../../../apis'
import styled from "styled-components";
import AutoSuggestion from "../../Util/AutoSuggestion";
import RemovableButton from "../../UI/RemovableButton";
import {
  BasicButton,
  FlexForm,
  FlexDiv,
  StyledRating,
  RatingText,
  AutosuggestStyleWrapper
} from "../../UI/SharedStyles";
import medIcon from "../../../assets/images/(white)med-icon.svg";
import "@fortawesome/fontawesome-free/css/all.css";
import Modal from "../../UI/Modals/Modal";
import { AuthContext } from "../../../contexts/AuthStore";
import { DrugContext } from "../../../contexts/DrugStore";

const Container = styled.div`
  max-height: 75vh;
  overflow: scroll;
`;

const Titles = styled.div`
  font-size: 0.875rem;
  font-weight: 800;
  color: #474747;
  margin-top: 1.82rem;
  margin-bottom: 0.625rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const AlertSpan = styled.span`
  font-size: 0.7rem;
  color: ${props => (props.clicked ? "red" : "var(--twoyak-blue)")};
  margin-left: 0.7rem;
  display: ${props => (props.show ? "inline" : "none")};
`;

const Form = styled(FlexForm)`
  margin: 0.3rem 0;
`;

const CustomTextarea = styled.textarea`
  width: 100%;
  height: 4.825rem;
  resize: none;
  font-size: 0.9rem;
  color: var(--twoyak-black);
  opacity: 0.7;
  padding: 1.25rem;
  border-radius: 1.5rem;
  border: solid 1px #00a2ff;
`;

const SubmitButton = styled(BasicButton)`
  display: block;
  margin: 3.25rem auto 2.43rem auto;
  ${props =>
    props.disable ? ` background-color: #d8d8d8; pointer: none;` : ""}
`;

const NewReview = React.memo(({ reviewSubmit, review, modalOff }) => {
  const [efficacy, setEfficacy] = useState(0);
  const [adverseEffects, setAdverseEffects] = useState([]);
  const [detail, setDetail] = useState();
  const [clicked, setClicked] = useState(false);

  const { state: authState } = useContext(AuthContext)
  const { state: drugState, dispatch } = useContext(DrugContext)

  useEffect(() => {
    fetchAdverseEffects()
  }, [])
  // 리뷰 수정 시
  useEffect(() => {
    if (review) {
      setEfficacy(review.attributes.efficacy);
      setDetail(review.attributes.body);
      setAdverseEffects(review.meta.adverse_effects);
    }
  }, [review]);

  // 수정 필
  const fetchAdverseEffects = async () => {
    try {
      const { data } = await axios.get('/autocomplete/adverse_effect', {
        headers: { Authorization: `bearer ${authState.token}` },
      })
      const payload = data.my_adverse_effects.concat(data.standard_adverse_effects)
      dispatch({ type: "GET_ADVERSE_EFFECTS", payload: payload });
    } catch (error) {
      console.log(error)
    }
  }

  const adverseEffectInputChange = async value => {
    if (value.id) {
      if (adverseEffects.findIndex(e => e.id === value.id) === -1)
        setAdverseEffects(adverseEffects.concat(value));
    }
  };

  // 수정 필
  const addAdverseEffect = async value => {
    try {
      const { data } = await axios.post(`/adverse_effects`, {
        adverse_effect: {
          symptom_name: value
        }
      }, {
          headers: {
            Authorization: `bearer ${authState.token}`
          }
        })
      adverseEffectInputChange(data)
    } catch (error) {
      console.log(error)
    }
  }

  const adverseEffectSubmit = event => {
    event.preventDefault();
  };

  const deleteAdverseEffect = content => {
    setAdverseEffects(adverseEffects.filter(effect => effect.id !== content));
  };

  const detailInputChange = event => {
    setDetail(event.target.value);
  };

  const finalReviewSubmit = event => {
    event.preventDefault();
    const adverseEffectIds = adverseEffects.map(effect => effect.id);
    if (review)
      reviewSubmit("put", efficacy, adverseEffectIds, detail, review.id, review.meta.drug.id);
    else reviewSubmit("post", efficacy, adverseEffectIds, detail, null);

    // clear
    setEfficacy(0);
    setAdverseEffects([]);
    setDetail();
  };

  const showAlert = () => {
    setClicked(true);
  };

  return (
    <Modal
      modalOff={modalOff}
      img={medIcon}
      imgalt="med-icon"
      title="리뷰 작성"
      content={
        <Container>
          <Titles>
            평점
            <AlertSpan show={!efficacy} clicked={clicked}>
              *필수 필드입니다
            </AlertSpan>
          </Titles>
          <FlexDiv>
            <StyledRating
              emptySymbol="fas fa-circle fa-2x custom"
              fullSymbol="fas fa-circle fa-2x custom full"
              fractions={2}
              onChange={setEfficacy}
              initialRating={efficacy}
            />
            <RatingText>{efficacy}</RatingText>
          </FlexDiv>
          <Titles>복용 후 이상반응이 있었나요?</Titles>
          <Form onSubmit={adverseEffectSubmit}>
            <AutosuggestStyleWrapper>
              <AutoSuggestion
                search="adverse_effect"
                searchKey="symptom_name"
                placeholderProp="느끼신 증상을 입력하세요"
                inputChange={adverseEffectInputChange}
                inputAdd={addAdverseEffect}
              />
            </AutosuggestStyleWrapper>
          </Form>
          {adverseEffects &&
            adverseEffects.map(effect => (
              <RemovableButton
                key={effect.id}
                effect={effect}
                deleteAdverseEffect={deleteAdverseEffect}
              />
            ))}
          <Titles>리뷰 내용</Titles>

          <CustomTextarea
            onChange={detailInputChange}
            placeholder="많은 사람들이 참고할 만한 의약품 리뷰를 남겨주세요"
            value={detail ? detail : ""}
          />
          <SubmitButton
            onClick={
              !efficacy
                ? () => {
                  showAlert();
                }
                : e => {
                  finalReviewSubmit(e);
                }
            }
            disable={!efficacy}
          >
            완료
          </SubmitButton>
        </Container>
      }
    />
  );
});

export default NewReview;
