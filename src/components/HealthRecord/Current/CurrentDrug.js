import React, { useState, useContext, useEffect } from "react";
import axios from "../../../apis";
import styled from "styled-components";
import NewReview from "../../Medicine/Review/NewReview";
import { AuthContext } from "../../../contexts/AuthStore";
import DrugReview from "../../Medicine/Review/DrugReview";
import { Link } from "react-router-dom";
import { ReactComponent as Close } from "../../../assets/images/close.svg";

import {
  Card,
  Line,
  BasicButton,
  StyledRating,
  RatingText,
  FlexDiv,
  BulletText
} from "../../UI/SharedStyles";
import medIcon from "../../../assets/images/med-icon.svg";

const CloseIcon = styled(Close)`
  width: 1rem;
  height: 1rem;
  align-self: flex-end;
  margin-top: -0.8rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const Title = styled(Link)`
  text-decoration: none;
  font-weight: 800;
  color: var(--twoyak-black);
`;

const Text = styled.div`
  color: var(--twoyak-black);
  font-size: 0.7rem;
`;

const Content = styled.div`
  margin: 1rem 1.68rem;
  font-size: 0.8rem;
  opacity: 0.8;
`;

const Rating = styled(StyledRating)`
  margin: 0 -2px;
  font-size: 10px;
  .custom {
    margin: 0 2px;
  }
`;

const CustomRatingText = styled(RatingText)`
  font-size: 0.69rem;
  margin-left: 0.4rem;
  font-weight: normal;
`;

const ButtonContainer = styled(FlexDiv)`
  justify-content: space-around;
  margin: 1rem 1.7rem 0 1.7rem;
`;

const CurrentDrug = ({
  drug,
  review,
  loadingHandler,
  drugToPast,
  deleteDrug
}) => {
  const [show, setShow] = useState(false);
  const [updateTarget, setUpdateTarget] = useState();
  const [message, setMessage] = useState([]);
  const { state: authState } = useContext(AuthContext);

  useEffect(() => {
    const loadMessage = () => {
      if (drug.dur_info) {
        const messageArray = [];
        Object.keys(drug.dur_info).forEach(info => {
          let infoVariable =
            drug.dur_info[info] &&
            drug.dur_info[info][0].description.split(" ");
          switch (info) {
            case "age":
              messageArray.push(`${infoVariable.join("")} 안 돼요!`);
              break;
            case "pregnancy":
              messageArray.push("임산부 안돼요!");
              break;
            case "stop_usage":
              messageArray.push("사용 중지된 약품입니다!");
              break;
            case "dosage":
              messageArray.push(`하루 ${infoVariable[4]} 이상 안돼요!`);
              break;
            case "period":
              messageArray.push(`${infoVariable[0]}일 이상 복용하시면 안돼요!`);
              break;
            case "elder":
              messageArray.push("65세 이상 고령자는 복용 시 주의하세요!!");
              break;
            default:
              break;
          }
        });
        setMessage(messageArray);
      }
    };
    loadMessage();
  }, [drug.dur_info]);

  const newReviewToggle = () => {
    setShow(!show);
  };

  // NewReview.js 리뷰 등록하기 버튼
  const reviewSubmitHandler = (
    method,
    efficacy,
    adverse_effect,
    detail,
    reviewId
  ) => {
    const data = {
      user_id: authState.userId,
      drug_id: drug.current_drug_id,
      efficacy: efficacy,
      body: detail,
      adverse_effect_ids: adverse_effect
    };

    if (method === "post") postReview(data);
    else if (method === "put") updateReview(data, reviewId);
  };

  // review upload
  const postReview = async data => {
    try {
      await axios.post(
        `drugs/${drug.id}/drug_reviews`,
        { drug_review: data },
        {
          headers: {
            Authorization: `bearer ${authState.token}`
          }
        }
      );
      setShow(false);
      loadingHandler();
    } catch (error) {
      console.log(error);
    }
  };

  // review update
  const updateReview = async (data, reviewId) => {
    try {
      await axios.put(
        `drugs/${drug.id}/drug_reviews/${reviewId}`,
        { drug_review: data },
        {
          headers: {
            Authorization: `bearer ${authState.token}`
          }
        }
      );
      setShow(false);
      loadingHandler();
    } catch (error) {
      console.log(error);
    }
  };

  // review delete
  const deleteReview = async reviewId => {
    try {
      await axios.delete(`drugs/${drug.id}/drug_reviews/${reviewId}`, {
        headers: {
          Authorization: `bearer ${authState.token}`
        }
      });
      loadingHandler();
    } catch (error) {
      console.log(error);
    }
  };

  // DrugReview.js 리뷰 수정하기 버튼
  const updateButton = review => {
    setShow(true);
    setUpdateTarget(review);
  };

  return (
    <Card>
      <CloseIcon
        onClick={() => {
          deleteDrug(drug.id);
        }}
      />
      <FlexDiv justify="space-between">
        <FlexDiv align="flex-start">
          <img
            src={medIcon}
            alt="med-icon"
            style={{ marginRight: "6px", marginTop: "5px" }}
          />
          <div style={{ width: typeof drug.drug_rating === "number" && "87%" }}>
            <Title to={`/medicine/${drug.current_drug_id}`}>
              {drug.drug_name.split("(")[0]}
            </Title>
            <Text>복용 시작일: {drug.from}</Text>
          </div>
        </FlexDiv>
        <FlexDiv shrink="0">
          {typeof drug.drug_rating === "number" ? (
            <>
              <Rating
                emptySymbol="fas fa-circle  custom"
                fullSymbol="fas fa-circle  custom full"
                initialRating={drug.drug_rating}
                readonly
              />
              <CustomRatingText>
                {drug.drug_rating.toFixed(1)} / 5.0
              </CustomRatingText>
            </>
          ) : (
            ""
          )}
        </FlexDiv>
      </FlexDiv>
      {(drug.dur_info || drug.memo || review) && <Line />}
      {show && (
        <NewReview
          reviewSubmit={reviewSubmitHandler}
          drugId={drug.current_drug_id}
          review={updateTarget}
          modalOff={newReviewToggle}
        />
      )}
      {!!drug.disease && (
        <>
          <BulletText>
            <p>복용이유</p>
          </BulletText>
          <Content>{drug.disease.name}</Content>
        </>
      )}
      {!drug.dur_info ? (
        ""
      ) : (
        <>
          <BulletText>
            <p>안전정보</p>
          </BulletText>
          <Content>
            {message.map((m, key) => (
              <div key={key}>{m}</div>
            ))}
          </Content>
        </>
      )}
      {drug.memo && (
        <>
          <BulletText>
            <p>메모</p>
          </BulletText>
          <Content>{drug.memo}</Content>
        </>
      )}
      {review ? (
        <>
          <BulletText>
            <p>내 리뷰</p>
          </BulletText>
          <DrugReview
            my={true}
            review={review}
            deleteReview={deleteReview}
            updateButton={updateButton}
          />
          <BasicButton
            opacity="0.6"
            onClick={() => {
              drugToPast(drug.id);
            }}
          >
            복용 종료
          </BasicButton>
        </>
      ) : (
        <ButtonContainer>
          <BasicButton onClick={newReviewToggle}>리뷰 등록</BasicButton>
          <BasicButton
            opacity="0.6"
            onClick={() => {
              drugToPast(drug.id);
            }}
          >
            복용 종료
          </BasicButton>
        </ButtonContainer>
      )}
    </Card>
  );
};

export default CurrentDrug;
