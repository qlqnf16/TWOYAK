import React, { useEffect } from "react";
import DrugReview from "./DrugReview";

const DrugReviews = ({ reviews, deleteReview, reviewState }) => {
  useEffect(() => {}, [reviewState]);
  return reviews.map(review => (
    <DrugReview review={review} key={review.id} deleteReview={deleteReview} />
  ));
};

export default DrugReviews;
