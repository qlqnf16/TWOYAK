import React, { useState, useEffect } from "react";
import CurrentDrug from "./CurrentDrug";

const CurrentDrugList = ({ currentDrugs, reviews, loadingHandler }) => {
  return currentDrugs.map(drug => {
    const review = reviews.find(review => review.drug_id === drug.id);
    return (
      <CurrentDrug
        drug={drug}
        key={drug.id}
        review={review}
        loadingHandler={loadingHandler}
      />
    );
  });
};

export default CurrentDrugList;
