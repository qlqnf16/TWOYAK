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
`;

function AllReviews() {
  const { state: authState } = useContext(AuthContext);
  const [recentReviews, setRecentReviews] = useState();
  const [popularReviews, setPopularReviews] = useState();

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      const [{ data: recent }, { data: popular }] = await Promise.all([
        axiosReviews("recent"),
        axiosReviews("popular")
      ]);
      setRecentReviews(recent);
      setPopularReviews(popular);
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
        <FilterContainer>
          <BasicText size="0.7rem">정렬 기준</BasicText>
          <br />
          <BasicText size="0.75rem" color="var(--twoyak-blue)">
            최신순
          </BasicText>
        </FilterContainer>
        {recentReviews &&
          recentReviews.map(review => (
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
