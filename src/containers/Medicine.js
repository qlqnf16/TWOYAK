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

import {
  Container,
  FlexDiv,
  BasicText,
  RatingText,
  StyledRating
} from "../components/UI/SharedStyles";

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

const ReviewContainer = styled.div`
  position: relative;
  width: fit-content;
`;

const RatingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 65px;
  width: 150px;
`;

const Rating = styled(StyledRating)`
  margin: 0 -2px;
  font-size: 10px;
  .custom {
    margin: 0 2px;
  }
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
  const [currentDrugs, setCurrentDrugs] = useState([]);

  const [modal, setModal] = useState(false); // 의약품 상세정보 모달
  const [showMore, setShowMore] = useState(false); // 더보기 버튼
  const [errorMessage, setErrorMessage] = useState();

  const { state } = useContext(DrugContext);
  const { drugs } = state; // 전체 의약품 목록

  // user informations
  const { state: authState } = useContext(AuthContext);

  // url에서 drug id param이 변하면 paramId 수정
  useEffect(() => {
    if (match.params.id) {
      setParamId(match.params.id);
    }
  }, [match.params.id]);

  // params 가 변하면 약물 검색
  useEffect(() => {
    // state 초기화
    setDrug(null);
    setDrugList(null);
    setDrugimg(null);

    searchById(paramId);
    getDrugImg(paramId);
    if (authState.token) {
      getCurrentDrugs();
    }
    return setDrugList(null);
  }, [paramId, authState]);

  // id로 약물검색
  const searchById = async id => {
    console.log(authState);
    const getDrugData = axios.get(`drugs/${id}`, {
      params: {
        sub_user_id: authState.subUserId
      }
    });
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
    console.log(term);
    setDrug(null);
    setDrugReview(null);

    try {
      let { data } = await axios.get("searchSingle", {
        params: { search_term: term }
      });
      console.log(data);
      if (data.item_name) {
        history.push(`/medicine?search_term=${term}`);
        setDrugList(data.item_name);
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

  // 현재 복용중인 약품
  const getCurrentDrugs = async () => {
    try {
      const { data } = await axios.get(
        `/user/${authState.subUserId}/current_drugs`,
        {
          headers: {
            Authorization: `bearer ${authState.token}`
          }
        }
      );
      const idList = data.map(d => d.current_drug_id);
      setCurrentDrugs(idList);
      // console.log(idList);
    } catch (error) {
      console.log(error);
    }
  };

  // 현재 복용중 약품에 추가
  const addCurrentDrug = async id => {
    try {
      await axios({
        method: "POST",
        url: `user/${authState.subUserId}/current_drugs/${id}`,
        headers: {
          Authorization: `bearer ${authState.token}`
        }
      });
      alert("추가됐습니다");
    } catch (error) {
      console.log(error.response);
    }
  };

  // searchResult 상세정보 modal toggle
  const modalOn = () => {
    setModal(true);
  };
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

  // 더보기 토글
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  if (match.params.id) {
    return (
      <>
        <Container>
          {window.innerWidth >= 960 && drugs && (
            <SearchInput
              searchTerms={searchByTerms}
              inputChange={searchTermChange}
              currentDrugs={currentDrugs}
              addCurrentDrug={addCurrentDrug}
            />
          )}
          {drug && (
            <>
              <SearchResult
                drug={drug}
                drugImg={drugimg}
                addCurrentDrug={addCurrentDrug}
                modalOn={modalOn}
                showMore={showMore}
                toggleShowMore={toggleShowMore}
              />
            </>
          )}
          {errorMessage && <div>{errorMessage}</div>}
          {drugReview && drugReview.length > 0 && (
            <>
              <FlexDiv>
                <ReviewContainer>
                  <BasicText>사용후기</BasicText>
                  <RatingContainer>
                    <Rating
                      emptySymbol="fas fa-circle custom"
                      fullSymbol="fas fa-circle custom full"
                      fractions={2}
                      initialRating={drug.drug_rating}
                      readonly
                    />
                    <RatingText
                      margin="0.5rem"
                      opacity="0.5"
                      size="0.7rem"
                      bold
                    >
                      {drug.drug_rating.toFixed(1)} / 5.0
                    </RatingText>
                  </RatingContainer>
                </ReviewContainer>
              </FlexDiv>
              {drugReview.map(review => (
                <DrugReview review={review} key={review.id} />
              ))}
            </>
          )}
        </Container>
        {modal && <DetailModal item_seq={drug.item_seq} modalOff={modalOff} />}
      </>
    );
  } else {
    return (
      <SearchContainer>
        {drugs && (
          <>
            <SearchInput
              goBack={goBack}
              term={term}
              searchTerms={searchByTerms}
              inputChange={searchTermChange}
              searchById={moveById}
              currentDrugs={currentDrugs}
              addCurrentDrug={addCurrentDrug}
            />{" "}
            {drugList && (
              <ItemList
                drug_list={drugList}
                term={term}
                addCurrentDrug={addCurrentDrug}
                currentDrugs={currentDrugs}
              />
            )}
          </>
        )}
      </SearchContainer>
    );
  }
}

export default Medicine;
