import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "../apis";
import styled from "styled-components";
import { DrugContext } from "../contexts/DrugStore";

import SearchInput from "../components/Medicine/Drugs/SearchInput";
import SearchResult from "../components/Medicine/Drugs/SearchResult";
import ItemList from "../components/Medicine/Drugs/ItemList";
import DetailModal from "../components/Medicine/Drugs/DetailModal";
import DrugReview from "../components/Medicine/Review/DrugReview";
import NewReview from "../components/Medicine/Review/NewReview";

import { Container } from "../components/UI/SharedStyles";

function Medicine({ match, history }) {
  let initialparam = !match.params.id ? 0 : match.params.id;
  const [paramId, setParamId] = useState(initialparam);
  const [term, setTerm] = useState();

  // fetch 결과 states
  const [drug, setDrug] = useState(null);
  const [drugimg, setDrugimg] = useState("");
  const [drugList, setDrugList] = useState(null);
  const [drugReview, setDrugReview] = useState(null);
  const [updateTarget, setUpdateTarget] = useState(); // drug review update

  const [modal, setModal] = useState(false); // 의약품 상세정보 모달
  const [showNewReview, setShowNewReview] = useState(true); // 리뷰 등록창 on off
  const [errorMessage, setErrorMessage] = useState();

  const { state } = useContext(DrugContext);
  const { drugs } = state; // 전체 의약품 목록

  // user informations
  const currentUserId = parseInt(localStorage.getItem("id"));
  const currentUserToken = localStorage.getItem("token");

  // url에서 drug id param이 변하면 paramId 수정
  useEffect(() => {
    if (match.params.id) {
      setParamId(match.params.id);
    }
  }, [match.params.id]);

  // paramId 가 변하면 id로 약물 검색
  useEffect(() => {
    // state 초기화
    setDrug(null);
    setDrugList(null);
    setDrugimg(null);
    setUpdateTarget(null);
    setShowNewReview(true);

    if (paramId) {
      searchById(paramId);
      getDrugImg(paramId);
    }
    return setDrugList(null);
  }, [paramId]);

  // id로 약물검색
  const searchById = async id => {
    const getDrugData = axios.get(`drugs/${id}`);
    const getDrugReviews = axios.get(`drugs/${id}/drug_reviews`);

    try {
      let [{ data: drugData }, { data: drugReviews }] = await Promise.all([
        getDrugData,
        getDrugReviews
      ]);
      console.log(drugData, drugReviews);

      setDrug(drugData);
      setDrugReview(drugReviews);
    } catch (error) {
      console.log(error);
    }
  };

  // 검색어로 약물검색
  const searchByTerms = async event => {
    event.preventDefault();
    setDrug(null);
    setDrugReview(null);

    try {
      let { data } = await axios.get("searchSingle", {
        params: { search_term: term }
      });
      if (data.item_name) {
        setDrugList(data.item_name);
      } else {
        setParamId(data.id);
        history.push(`/medicine/${data.id}`);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("문제가 생겼습니다. 다시 시도하세요!");
    }
  };

  // id로 이미지 url 가져오기
  const getDrugImg = async id => {
    try {
      const { data } = await axios.get(`drugs/${id}/pics`);
      setDrugimg(data.pics[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // 검색어 inputChangeHandler
  const searchTermChange = value => {
    setTerm(value);
  };

  // searchResult 상세정보 modal toggle
  const modalOn = useCallback(() => {
    setModal(true);
  }, []);
  const modalOff = () => {
    setModal(false);
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
      user_id: currentUserId,
      drug_id: paramId,
      efficacy: efficacy,
      body: detail,
      adverse_effect_ids: adverse_effect
    };

    if (method === "post") postReview(data);
    else if (method === "put") updateReview(data, reviewId);
  };

  // review upload
  const postReview = data => {
    axios
      .post(
        `drugs/${paramId}/drug_reviews`,
        { drug_review: data },
        {
          headers: {
            Authorization: `bearer ${currentUserToken}`
          }
        }
      )
      .then(response => {
        searchById(paramId);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // review update
  const updateReview = (data, reviewId) => {
    axios
      .put(
        `drugs/${paramId}/drug_reviews/${reviewId}`,
        { drug_review: data },
        {
          headers: {
            Authorization: `bearer ${currentUserToken}`
          }
        }
      )
      .then(response => {
        searchById(paramId);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // review delete
  const deleteReview = reviewId => {
    setShowNewReview(true);
    axios
      .delete(`drugs/${paramId}/drug_reviews/${reviewId}`, {
        headers: {
          Authorization: `bearer ${currentUserToken}`
        }
      })
      .then(res => {
        searchById(paramId);
      })
      .catch(err => console.log(err));
  };

  // DrugReview.js 리뷰 수정하기 버튼
  const updateButton = review => {
    setShowNewReview(true);
    setUpdateTarget(review);
  };

  // 리뷰 등록창 on off
  useEffect(() => {
    if (drugReview) {
      const reviewUserIds = drugReview.map(review => review.u_id);
      if (reviewUserIds.indexOf(currentUserId) !== -1) setShowNewReview(false);
    }
  }, [drugReview]);

  return (
    <>
      <Container>
        {drugs && (
          <SearchInput
            searchTerms={searchByTerms}
            inputChange={searchTermChange}
          />
        )}
        {drug && (
          <>
            <SearchResult drug={drug} drugImg={drugimg} modalOn={modalOn} />
          </>
        )}
        {drugList && <ItemList drug_list={drugList} />}
        {errorMessage && <div>{errorMessage}</div>}
        {drugReview &&
          drugReview.map(review => (
            <DrugReview
              review={review}
              currentUserId={currentUserId}
              key={review.id}
              deleteReview={deleteReview}
              updateButton={updateButton}
            />
          ))}
        {drug && showNewReview && (
          <NewReview reviewSubmit={reviewSubmitHandler} review={updateTarget} />
        )}
      </Container>
      {modal && <DetailModal item_seq={drug.item_seq} modalOff={modalOff} />}
    </>
  );
}

export default Medicine;
