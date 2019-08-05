import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import PastDrug from "./PastDrug";
import DrugReview from "../../Medicine/Review/DrugReview";
import Modal from "../../UI/Modal";

import styled from "styled-components";
import { BulletText, BasicButton, FlexDiv } from "../../UI/SharedStyles";

const MarginDiv = styled.div`
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Button = styled(BasicButton)`
  display: block;
  margin: 1rem auto;
  font-size: 0.8rem;
`;

const EmptyReview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color:#f0f9ff;
  margin-top: 1rem;
  border-radius: 1rem;
  border: 1px #bbb dashed;
  font-size: 0.9rem;
`

const PastDrugList = ({ drugs, deleteDrug, loadingHandler }) => {
  const monthCategory = {};
  const [show, setShow] = useState(false);
  const [targetDrug, setTargetDrug] = useState();

  // 월별 복용 약품 분류
  drugs.forEach(drug => {
    const from = moment(drug.from);
    const to = moment(drug.to);
    const difference = to.diff(from, "months");
    const addingData = {
      name: drug.drug_name,
      from: drug.from,
      to: drug.to,
      id: drug.past_drug_id
      // disease: drug.disease
    };

    !monthCategory[from.format("YYYY-MM")]
      ? (monthCategory[from.format("YYYY-MM")] = [addingData])
      : monthCategory[from.format("YYYY-MM")].push(addingData);

    if (difference > 0) {
      for (let i = 1; i <= difference + 1; i++) {
        let tempMonth = from.add(1, "M").format("YYYY-MM");
        if (monthCategory[tempMonth] === undefined)
          monthCategory[tempMonth] = [addingData];
        else {
          monthCategory[tempMonth].push(addingData);
        }
      }
    }
  });

  // 질환별 약품 분류
  const categorizeByDisease = drugs => {
    const diseaseCategory = {};
    drugs.forEach(drug => {
      const addingData = {
        name: drug.name,
        from: drug.from,
        to: drug.to,
        id: drug.id,
        disease: drug.disease
      };

      !diseaseCategory[drug.disease]
        ? (diseaseCategory[drug.disease] = [addingData])
        : diseaseCategory[drug.disease].push(addingData);
    });
  };

  // monthCategory.forEach(drugs => {
  //   categorizeByDisease(drugs)
  // })

  // modal on
  const modalOn = async id => {
    let target;
    drugs.forEach(d => {
      if (d.past_drug_id === id) {
        target = d;
      }
    });
    await setTargetDrug(target);
    setShow(true);
  };

  // modal off
  const modalOff = () => {
    setShow(false);
  };

  const months = Object.keys(monthCategory)
    .sort()
    .reverse();

  const deletePastDrug = async id => {
    await deleteDrug(id, true)
    setShow(false);
    loadingHandler(true)
  }

  return (
    <div>
      {months.length > 0 &&
        months.map(month => (
          <PastDrug
            key={month}
            dateArray={month.split("-")}
            monthCategory={monthCategory[month]}
            modalOn={modalOn}
          />
        ))}
      {show && (
        <Modal
          title={targetDrug.drug_name.split("(")[0]}
          content={
            targetDrug && (
              <>
                {targetDrug.my_review ? (
                  <MarginDiv>
                    <BulletText>
                      <p>내 리뷰</p>
                    </BulletText>
                    <DrugReview my={true} review={targetDrug.my_review} />
                  </MarginDiv>
                ) : <EmptyReview>내가 남긴 리뷰가 없습니다.</EmptyReview>}
                <FlexDiv>
                  <Button>
                    <StyledLink to={`medicine/${targetDrug.past_drug_id}`}>
                      약 정보 보기
                  </StyledLink>
                  </Button>
                  <Button onClick={() => deletePastDrug(targetDrug.id)}>삭제하기</Button>
                </FlexDiv>
              </>
            )
          }
          modalOff={modalOff}
        />
      )}
    </div>
  );
};

export default PastDrugList;
