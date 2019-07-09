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
