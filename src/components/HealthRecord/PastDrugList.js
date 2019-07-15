import React, { useState } from "react";
import moment from "moment";
import PastDrug from "./PastDrug";
import AddCard from "./AddCard";
import Modal from "../UI/Modal";
import { Link } from "react-router-dom";

const PastDrugList = ({ drugs }) => {
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

  // modal on
  const modalOn = async id => {
    const target = drugs.map(d => d.past_drug_id === id && d);
    await setTargetDrug(target[0]);
    setShow(true);
  };

  // modal off
  const modalOff = () => {
    setShow(false);
  };

  const months = Object.keys(monthCategory)
    .sort()
    .reverse();

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
      <AddCard text={["복용이 끝나신 약을", <br />, "추가해보세요!"]} />
      {show && (
        <Modal
          title={targetDrug.drug_name.split("(")[0]}
          content={
            targetDrug && (
              <>
                <div>뭐야</div>
                <div>{targetDrug && targetDrug.drug_name.split("(")[0]}</div>
                <div>{targetDrug.my_review.efficacy}</div>
                <Link to={`medicine/${targetDrug.past_drug_id}`}>
                  상세정보 보기
                </Link>
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
