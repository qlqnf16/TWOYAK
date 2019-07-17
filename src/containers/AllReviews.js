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

function AllReviews() {
  const { state: authState } = useContext(AuthContext);
  const [reviews, setReveiws] = useState();

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      const { data } = await axios.get(`/reviews/recent`, {
        headers: {
          Authorization: `bearer ${authState.token}`
        }
      });
      setReveiws(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Background />
      <Container>
        {reviews &&
          reviews.map(review => (
            <ReviewCard>
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
