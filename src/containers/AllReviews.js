import React, { useContext, useEffect, useState } from "react";
import axios from "../apis";
import { Link } from 'react-router-dom'
import {
  Container,
  Card,
  Line,
  FlexDiv,
  BasicText
} from "../components/UI/SharedStyles";
import { AuthContext } from "../contexts/AuthStore";
import DrugReview from "../components/Medicine/Review/DrugReview";
import medIcon from "../assets/images/med-icon.svg";
import { ReactComponent as Arrow } from "../assets/images/arrow.svg";
import styled from "styled-components";
import LoginModal from "../components/UI/LoginModal";
import NewReview from "../components/Medicine/Review/NewReview";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f0f9ff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const ReviewCard = styled(Card)`
  padding: 1.4rem 1rem;
`;

const ReviewContainer = styled.div`
  margin: -1rem -1rem;
`;

const FilterContainer = styled.div`
  margin: 1rem;
  align-self: flex-start;
  position: relative;
`;

const Filters = styled.div`
  position: absolute;
  top: 1.7rem;
  left: 0;
  width: 4rem;
  z-index: 50;
  padding-left: 0.4rem;
  border-radius: 5px;
  border: solid 1px #00a2ff;
  background-color: #ffffff;
`;

const ArrowIcon = styled(Arrow)`
  margin-left: 0.5rem;
`;

const ReviewTitle = styled(Link)`
font-size: 0.875rem;
  color: var(--twoyak-black);
  font-weight: bold;
  text-decoration: none;
`

function AllReviews({ match }) {
  const { state: authState } = useContext(AuthContext);
  const [reviews, setReviews] = useState();
  const [category, setCategory] = useState({ name: "최신순", url: 'recent' });
  const [showFilter, setShowFilter] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showNewReview, setShowNewReview] = useState(false);
  const [updateTarget, setUpdateTarget] = useState()

  useEffect(() => {
    if (match.params.my) getReviews('my_reviews')
    else getReviews('recent');
  }, []);

  const getReviews = async type => {
    try {
      let result = {}
      if (type === 'my_reviews') {
        result = await axios.get("/reviews/my_reviews", {
          headers: {
            Authorization: `bearer ${authState.token}`
          }
        });
      }
      else {
        result = await axios.get(`/reviews/${type}`, {
          headers: {
            Authorization: `bearer ${authState.token}`
          }
        });
      }

      setReviews(result.data.data);
      switch (type) {
        case 'recent':
          setCategory({ name: "최신순", url: 'recent' });
          break;
        case 'high_rating':
          setCategory({ name: "평점순", url: 'high_rating' });
          break;
        case 'popular':
          setCategory({ name: "좋아요순", url: 'popular' });
          break;
        case 'my_reviews':
          setCategory({ name: "내 리뷰", url: 'my_reviews' })
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };


  // 좋아요 토글
  const toggleLike = async id => {
    if (authState.token) {
      try {
        await axios({
          method: "POST",
          url: `/drug_reviews/${id}/like`,
          headers: {
            Authorization: `bearer ${authState.token}`
          }
        });
        getReviews(category.url)
      } catch (err) {
        console.log(err)
      }
    } else {
      setShowLoginModal(true)
    }
  };

  // 리뷰 수정/삭제
  // review update
  const updateReview = async (method, efficacy, adverse_effect, detail, reviewId, drugId) => {
    const data = {
      user_id: authState.userId,
      drug_id: drugId,
      efficacy: efficacy,
      body: detail,
      adverse_effect_ids: adverse_effect
    }
    try {
      await axios.put(
        `drugs/${drugId}/drug_reviews/${reviewId}`,
        { drug_review: data },
        {
          headers: {
            Authorization: `bearer ${authState.token}`
          }
        }
      );
      setShowNewReview(false);
      getReviews(category.url)
    } catch (error) {
      console.log(error);
    }
  };

  // review delete
  const deleteReview = async (reviewId, drugId) => {
    try {
      await axios.delete(`drugs/${drugId}/drug_reviews/${reviewId}`, {
        headers: {
          Authorization: `bearer ${authState.token}`
        }
      });
      getReviews(category.url)
    } catch (error) {
      console.log(error);
    }
  };

  // DrugReview.js 리뷰 수정하기 버튼
  const updateButton = review => {
    setShowNewReview(true);
    setUpdateTarget(review);
  };

  return (
    <>
      <Background />
      <Container>
        <FilterContainer
          onClick={() => {
            setShowFilter(!showFilter);
          }}
        >
          <BasicText size="0.75rem" color="var(--twoyak-blue)">
            {category.name}
          </BasicText>
          <ArrowIcon />
          {showFilter && (
            <Filters>
              <BasicText
                size="0.7rem"
                bold
                onClick={() => getReviews('recent')}
              >
                최신순
              </BasicText>
              <br />
              <BasicText
                size="0.7rem"
                bold
                onClick={() => getReviews('popular')}
              >
                좋아요순
              </BasicText>
              <br />
              <BasicText
                size="0.7rem"
                bold
                onClick={() => {
                  getReviews('high_rating')
                }}
              >
                평점순
              </BasicText>
              <br />
              {authState.token && (
                <BasicText
                  size="0.7rem"
                  bold
                  onClick={() => {
                    getReviews('my_reviews')
                  }}
                >
                  내 리뷰
                </BasicText>
              )}
            </Filters>
          )}
        </FilterContainer>
        {reviews &&
          reviews.map(review => (
            <ReviewCard key={review.id}>
              <FlexDiv align="flex-start">
                <img
                  src={medIcon}
                  alt="med-icon"
                  style={{ marginRight: "6px", marginTop: "5px" }}
                />
                <ReviewTitle to={`/medicine/${review.meta.drug.id}`}>{review.meta.drug.name.split("(")[0]}</ReviewTitle>
              </FlexDiv>
              <Line />
              <ReviewContainer>
                <DrugReview
                  review={review}
                  toggleLike={toggleLike}
                  deleteReview={deleteReview}
                  updateButton={updateButton}
                />
              </ReviewContainer>
            </ReviewCard>
          ))}
      </Container>
      {showNewReview && <NewReview reviewSubmit={updateReview} review={updateTarget} modalOff={() => setShowNewReview(false)} />}
      {showLoginModal && <LoginModal modalOff={() => setShowLoginModal(false)} />}
    </>
  );
}

export default AllReviews;
