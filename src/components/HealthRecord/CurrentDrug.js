import React, { useState, useContext, useEffect } from "react";
import axios from "../../apis";
import styled from "styled-components";
import NewReview from "../Medicine/Review/NewReview";
import { AuthContext } from "../../contexts/AuthStore";
import DrugReview from "../Medicine/Review/DrugReview";
import { Card, Line, BasicButton } from "../UI/SharedStyles";

const Title = styled.div`
  font-weight: 800;
`;

const CurrentDrug = ({ drug, review, reviewSubmit, loadingHandler }) => {
  const [show, setShow] = useState(false);
  const [updateTarget, setUpdateTarget] = useState();
  const { state: authState } = useContext(AuthContext);

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
      drug_id: drug.id,
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
    console.log(review);
  };
  const message = [];

  useEffect(() => {
    if (drug.dur_info) {
      Object.keys(drug.dur_info).forEach(info => {
        switch (info) {
          case "age":
            message.push(`안 돼요!`);
            break;
          case "pregnancy":
            message.push(`임산부 안 돼요!`);
            break;
          case "stop_usage":
            message.push(`사용 중지된 약품입니다!`);
            break;
          case "dosage":
            message.push(`하루 ~ 이상 안 돼요!`);
            break;
          case "period":
            message.push(`이상 복용하시면 안 돼요!`);
            break;
          case "elder":
            message.push(`65세 이상 고령자는 복용 시 주의하세요!`);
            break;
          default:
            break;
        }
      });
    }
  }, [drug]);

  return (
    <Card>
      <Title>{drug.name}</Title>
      <Line />
      {show && (
        <NewReview
          reviewSubmit={reviewSubmitHandler}
          drugId={drug.id}
          review={updateTarget}
          modalOff={newReviewToggle}
        />
      )}
      {drug.dur_info && message.map(m => <div>{m}</div>)}

      {review ? (
        <DrugReview
          review={review}
          deleteReview={deleteReview}
          updateButton={updateButton}
        />
      ) : (
        <BasicButton onClick={newReviewToggle}>리뷰 등록하기</BasicButton>
      )}
    </Card>
  );
};

export default CurrentDrug;
