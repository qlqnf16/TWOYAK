import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "../apis";
import SearchInput from "../components/Medicine/SearchInput";
import styled from "styled-components";
import SearchResult from "../components/Medicine/SearchResult";
import ItemList from "../components/Medicine/ItemList";
import { DrugContext } from "../contexts/DrugStore";
import DetailModal from "../components/Medicine/DetailModal";
import DrugReview from "../components/Medicine/DrugReview.js";
import NewReview from "../components/Medicine/NewReview";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 25vh auto;
`;

function Medicine({ match, history }) {
  let initialparam = !match.params.id ? 0 : match.params.id;
  const [paramId, setParamId] = useState(initialparam);
  const [term, setTerm] = useState();
  const [drug, setDrug] = useState(null);
  const [drugimg, setDrugimg] = useState("");
  const [drugList, setDrugList] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [modal, setModal] = useState(false);
  const [drugReview, setDrugReview] = useState(null);
  const [reviewState, setReviewState] = useState({
    adverse_effect: null
  });

  const { state } = useContext(DrugContext);
  const { drugs } = state;

  // url에서 drug id param이 변하면 paramId 수정
  useEffect(() => {
    if (match.params.id) {
      setParamId(match.params.id);
    }
  }, [match.params.id]);

  useEffect(() => {}, [reviewState]);

  // paramId 가 변하면 id로 약물 검색
  useEffect(() => {
    setDrug(null);
    setDrugList(null);
    setDrugimg(null);

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
      setReviewState(true);
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

  // 검색 inputChangeHandler
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

  // review upload handler
  const submitReview = (efficacy, adverse_effect, detail) => {
    setReviewState(false);
    const data = {
      user_id: 1, // 일단 dummy, login 과 연동 후 수정 필요
      drug_id: paramId,
      efficacy: efficacy,
      body: detail,
      adverse_effect_ids: [adverse_effect]
    };
    axios
      .post(`drugs/${paramId}/drug_reviews`, data, {
        headers: {
          Authorization: `bearer ${process.env.REACT_APP_TEMP_TOKEN}`
        }
      })
      .then(response => {
        console.log(data);
        console.log(response);
        setReviewState(true);
      })
      .catch(error => {
        console.log(data);
        console.log(error);
      });
  };

  // review delete handler
  const deleteReview = reviewId => {
    axios
      .delete(`drugs/${paramId}/drug_reviews/${reviewId}`, {
        headers: {
          Authorization: `bearer ${process.env.REACT_APP_TEMP_TOKEN}`
        }
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

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
            <NewReview reviewSubmit={submitReview} />
          </>
        )}
        {drugList && <ItemList drug_list={drugList} />}
        {errorMessage && <div>{errorMessage}</div>}
        {drugReview &&
          reviewState &&
          drugReview.map(review => (
            <DrugReview
              review={review}
              key={review.id}
              deleteReview={deleteReview}
            />
          ))}
      </Container>
      {modal && <DetailModal item_seq={drug.item_seq} modalOff={modalOff} />}
    </>
  );
}

export default Medicine;
