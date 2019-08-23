import React, { useState, useEffect, useContext } from "react";
import axios from "../apis";
import qs from "querystring";
import styled from "styled-components";
import moment from "moment";
import { DrugContext } from "../contexts/DrugStore";
import { AuthContext } from "../contexts/AuthStore";

import SearchInput from "../components/Medicine/Drugs/SearchInput";
import SearchResult from "../components/Medicine/Drugs/SearchResult";
import ItemList from "../components/Medicine/Drugs/ItemList";
import DetailModal from "../components/Medicine/Drugs/DetailModal";
import DrugReview from "../components/Medicine/Review/DrugReview";
import AddModal from "../components/Medicine/Modals/AddModal";
import DeleteModal from "../components/Medicine/Modals/DeleteModal";

import {
  Container,
  FlexDiv,
  BasicText,
  RatingText,
  StyledRating
} from "../components/UI/SharedStyles";
import LoginModal from "../components/UI/LoginModal";

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
  const [watching, setWatching] = useState(false);

  const [addModal, setAddModal] = useState(false); // 약품 추가 모달
  const [deleteModal, setDeleteModal] = useState(false); // 약품 제거 모달
  const [drugId, setDrugId] = useState()
  const [modal, setModal] = useState(false); // 의약품 상세정보 모달
  const [showMore, setShowMore] = useState(false); // 더보기 버튼
  const [showLogin, setShowLogin] = useState(false);
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
    if (paramId) {
      if (localStorage.jwt_token) {
        if (authState.token) {
          searchById(paramId);
          getDrugImg(paramId);
          getCurrentDrugs()
        }
      } else {
        searchById(paramId);
        getDrugImg(paramId);
      }
    }
    return setDrugList(null);
  }, [paramId, authState]);

  // id로 약물검색
  const searchById = async id => {
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

      setDrug(drugData);
      setDrugReview(drugReviews.data);
      setWatching(drugData.watching);
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
  const addCurrentDrug = async (id, data) => {
    const idParam = !id ? drugId : id
    try {
      let url = "current_drugs";
      if (data.formattedTo < moment().format("YYYY-MM-DD")) url = "past_drugs";
      await axios({
        method: "POST",
        url: `user/${authState.subUserId}/${url}/${idParam}`,
        params: {
          disease_ids: data.diseaseId,
          from: data.formattedFrom,
          to: data.formattedTo,
          memo: data.memoToSend
        },
        paramsSerializer: params => {
          return qs.stringify(params);
        },
        headers: {
          Authorization: `bearer ${authState.token}`
        }
      });
      alert("추가됐습니다");
      setAddModal(false);
      searchById(drug.id);
    } catch (error) {
      console.log(error.response);
    }
  };

  // 과거 복용중으로 보내기
  const toPastDrug = async () => {
    try {
      await axios.delete(
        `user/${authState.subUserId}/current_drugs/${
        drug.currently_taking.current_drug_id
        }/to_past`,
        {
          headers: {
            Authorization: `bearer ${authState.token}`
          }
        }
      );
      searchById(drug.id);
      setDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  // 현재 복용중 약품에서 제거
  const deleteCurrentDrug = async () => {
    try {
      await axios.delete(
        `user/${authState.subUserId}/current_drugs/${
        drug.currently_taking.current_drug_id
        }`,
        {
          headers: {
            Authorization: `bearer ${authState.token}`
          }
        }
      );
      searchById(drug.id);
      setDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  // 약품 추가 / 제거 modal toggle
  const additionalModalToggle = async (type, id) => {
    if (!!id)
      setDrugId(id)

    switch (type) {
      case "add":
        setAddModal(!addModal);
        break;
      case "delete":
        setDeleteModal(!deleteModal);
        break;
      default:
        break;
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

  // 관심목록 토글
  const toggleWatching = async () => {
    try {
      await axios.post(
        `/user/watch_drugs`,
        {
          watch_drug: { user_id: authState.userId, watch_drug_id: drug.id }
        },
        { headers: { Authorization: authState.token } }
      );
      setWatching(!watching);
    } catch (error) {
      console.log(error);
    }
  };

  // 리뷰 좋아요 토글
  const toggleLike = async id => {
    if (authState.token) {
      try {
        await axios({
          method: "POST",
          url: `/drug_reviews/${id}/like`,
          headers: {
            Authorization: authState.token
          }
        });
        const { data } = await axios.get(`drugs/${drug.id}/drug_reviews`);
        setDrugReview(data.data)
      } catch (err) {
        console.log(err)
      }
    } else {
      setShowLogin(true)
    }
  };

  if (match.params.id) {
    return (
      <>
        <Container preventScroll={addModal || deleteModal}>
          {/* desktop 화면 */}
          {window.innerWidth >= 960 && drugs && (
            <SearchInput
              searchTerms={searchByTerms}
              inputChange={searchTermChange}
              currentDrugs={currentDrugs}
              additionalModalToggle={additionalModalToggle}
            />
          )}
          {showLogin && <LoginModal modalOff={() => setShowLogin(false)} />}

          {drug && (
            <>
              <SearchResult
                drug={drug}
                drugImg={drugimg}
                modalOn={modalOn}
                showMore={showMore}
                watching={watching}
                toggleShowMore={toggleShowMore}
                toggleWatching={toggleWatching}
                additionalModalToggle={additionalModalToggle}
                showLogin={() => setShowLogin(true)}
                auth={!authState.token ? false : true}
              />
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
                          {drug.drug_rating.toFixed(1)}  / 5.0
                    </RatingText>
                      </RatingContainer>
                    </ReviewContainer>
                  </FlexDiv>
                  {drugReview.map(review => (
                    <DrugReview review={review} key={review.id} toggleLike={toggleLike} />
                  ))}
                </>
              )}
            </>
          )}
          {errorMessage && <div>{errorMessage}</div>}

        </Container>
        {modal && <DetailModal item_seq={drug.item_seq} modalOff={modalOff} />}
        {addModal && (
          <AddModal
            additionalModalToggle={additionalModalToggle}
            addCurrentDrug={addCurrentDrug}
            drugId={!drug.id ? drugId : drug.id}
          />
        )}
        {deleteModal && (
          <DeleteModal
            additionalModalToggle={additionalModalToggle}
            deleteCurrentDrug={deleteCurrentDrug}
            toPastDrug={toPastDrug}
          />
        )}
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
              addCurrentDrug={additionalModalToggle}
            />{" "}
            {drugList && (
              <ItemList
                drug_list={drugList}
                term={term}
                addCurrentDrug={additionalModalToggle}
                currentDrugs={currentDrugs}
              />
            )}
            {addModal && (
              <AddModal
                additionalModalToggle={additionalModalToggle}
                addCurrentDrug={addCurrentDrug}
              />
            )}
          </>
        )}
      </SearchContainer>
    );
  }
}

export default Medicine;
