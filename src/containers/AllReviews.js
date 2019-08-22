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
  const [recentReviews, setRecentReviews] = useState();
  const [popularReviews, setPopularReviews] = useState();
  const [highRatedReviews, setHighRatedReviews] = useState();
  const [myReviews, setMyReviews] = useState();
  const [category, setCategory] = useState("최신순");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    getReviews();
    if (authState.token) getMyReviews();
  }, [authState]);

  const getReviews = async () => {
    try {
      const { data: recent } = await axios.get("/reviews/recent");
      if (!match.params.my) setReviews(recent);
      setRecentReviews(recent);

      // // 좋아요 구현 후
      // const [{ data: popular }, { data: highRating }] = await Promise.all([
      //   axios.get("/reviews/popular"),
      //   axios.get("/reviews/high_rating")
      // ]);
      // setPopularReviews(popular);
      const { data } = await axios.get("/reviews/high_rating");
      setHighRatedReviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyReviews = async () => {
    try {
      const { data: my } = await axios.get("/reviews/my_reviews", {
        headers: {
          Authorization: `bearer ${authState.token}`
        }
      });
      setMyReviews(my);
      if (match.params.my) {
        setReviews(my)
        setCategory('내 리뷰')
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 좋아요 구현
  // const toggleLike = async id => {
  //   try {
  //     await axios({
  //       method: "POST",
  //       url: `/drug_reviews/${id}/like`,
  //       headers: {
  //         Authorization: authState.token
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     switch (category) {
  //       case "최신순":
  //         getReview("recent");
  //         setReviews(recentReviews);
  //         break;
  //       case "좋아요순":
  //         getReview("popular");
  //         break;
  //       case "평점순":
  //         getReview("high_rating");
  //         break;
  //       case "내 리뷰":
  //         getMyReviews();
  //         break;
  //       default:
  //         break;
  //     }
  //     setLoading(!loading);
  //     console.log(loading);
  //   }
  // };

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
            {category}
          </BasicText>
          <ArrowIcon />
          {showFilter && (
            <Filters>
              <BasicText
                size="0.7rem"
                bold
                onClick={() => {
                  setReviews(recentReviews);
                  setCategory("최신순");
                }}
              >
                최신순
              </BasicText>
              <br />
              {/* 좋아요 구현
              <BasicText
                size="0.7rem"
                bold
                onClick={() => {
                  setReviews(popularReviews);
                  setCategory("좋아요순");
                }}
              >
                좋아요순
              </BasicText>
              <br /> */}
              <BasicText
                size="0.7rem"
                bold
                onClick={() => {
                  setReviews(highRatedReviews);
                  setCategory("평점순");
                }}
              >
                평점순
              </BasicText>
              <br />
              {myReviews && (
                <BasicText
                  size="0.7rem"
                  bold
                  onClick={() => {
                    setReviews(myReviews);
                    setCategory("내 리뷰");
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
                <ReviewTitle to={`/medicine/${review.drug_id}`}>{review.drug.split("(")[0]}</ReviewTitle>
              </FlexDiv>
              <Line />
              <ReviewContainer>
                <DrugReview
                  review={review}
                // toggleLike={toggleLike}
                />
              </ReviewContainer>
            </ReviewCard>
          ))}
      </Container>
    </>
  );
}

export default AllReviews;
