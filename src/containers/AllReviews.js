import React, { useContext, useEffect, useState } from "react";
import axios from "../apis";
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

function AllReviews() {
  const { state: authState } = useContext(AuthContext);
  const [reviews, setReviews] = useState();
  const [recentReviews, setRecentReviews] = useState();
  const [popularReviews, setPopularReviews] = useState();
  const [highRatedReviews, setHighRatedReviews] = useState();
  const [myReviews, setMyReviews] = useState();
  const [category, setCategory] = useState("최신순");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (authState.token) getReviews();
  }, [authState]);

  const getReviews = async () => {
    try {
      const { data: recent } = await axiosReviews("recent");
      setReviews(recent);
      setRecentReviews(recent);

      const [
        { data: popular },
        { data: highRating },
        { data: myReview }
      ] = await Promise.all([
        axiosReviews("popular"),
        axiosReviews("high_rating"),
        axiosReviews("my_reviews")
      ]);
      setPopularReviews(popular);
      setHighRatedReviews(highRating);
      setMyReviews(myReview);
    } catch (error) {
      console.log(error);
    }
  };

  const axiosReviews = url =>
    axios.get(`/reviews/${url}`, {
      headers: {
        Authorization: `bearer ${authState.token}`
      }
    });

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
              <br />
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
                <BasicText>{review.drug.split("(")[0]}</BasicText>
              </FlexDiv>
              <Line />
              <ReviewContainer>
                <DrugReview review={review} />
              </ReviewContainer>
            </ReviewCard>
          ))}
      </Container>
    </>
  );
}

export default AllReviews;
