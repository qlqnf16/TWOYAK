import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "../apis";
import styled from "styled-components";
import { DrugContext } from "../contexts/DrugStore";
import { AuthContext } from "../contexts/AuthStore";

import SearchInput from "../components/Medicine/Drugs/SearchInput";
import SearchResult from "../components/Medicine/Drugs/SearchResult";
import ItemList from "../components/Medicine/Drugs/ItemList";
import DetailModal from "../components/Medicine/Drugs/DetailModal";
import DrugReview from "../components/Medicine/Review/DrugReview";
import NewReview from "../components/Medicine/Review/NewReview";

import { Container } from "../components/UI/SharedStyles";

const SearchContainer = styled.div`
  width: 100%;
  padding: 20px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: white;
`;

function Medicine({ match, history, location }) {
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
  const { state: authState } = useContext(AuthContext);

  // useEffect(() => {
  //   searchByTerms();
  // }, [location.state.term]);

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
    event && event.preventDefault();
    setDrug(null);
    setDrugReview(null);

    try {
      let { data } = await axios.get("searchSingle", {
        params: { search_term: term }
      });
      if (data.item_name) {
        setDrugList(data.name);
      } else {
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

  // 뒤로가기
  const goBack = () => {
    history.goBack();
  };

  // 검색하는 아이디로 이동
  const moveById = id => {
    history.push(`/medicine/${id}`);
  };

  if (match.params.id) {
    return (
      <>
        <Container>
          {window.innerWidth >= 960 && drugs && (
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
              <DrugReview review={review} key={review.id} />
            ))}
        </Container>
        {modal && <DetailModal item_seq={drug.item_seq} modalOff={modalOff} />}
      </>
    );
  } else {
    return (
      <SearchContainer>
        {drugs && (
          <SearchInput
            goBack={goBack}
            term={term}
            searchTerms={searchByTerms}
            inputChange={searchTermChange}
            searchById={moveById}
          />
        )}
      </SearchContainer>
    );
  }
}

export default Medicine;
