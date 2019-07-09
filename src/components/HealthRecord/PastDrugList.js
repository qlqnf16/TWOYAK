import React from "react";
import moment from "moment";

const PastDrugList = ({ drugs }) => {
  const monthCategory = {};

  // 월별 복용 약품 분류
  drugs.forEach(drug => {
    const from = moment(drug.from);
    const to = moment(drug.to);
    const difference = to.diff(from, "months");
    const addingData = { name: drug.drug_name, from: drug.from, to: drug.to };

    monthCategory[from.format("YYYY-MM")]
      ? monthCategory[from.format("YYYY-MM")].push(addingData)
      : (monthCategory[from.format("YYYY-MM")] = [addingData]);
    if (difference > 0) {
      for (let i = 1; i < difference + 1; i++) {
        monthCategory[from.add(i, "month").format("YYYY-MM")]
          ? monthCategory[from.add(i, "month").format("YYYY-MM")].push(
              addingData
            )
          : (monthCategory[from.add(i, "month").format("YYYY-MM")] = [
              addingData
            ]);
      }
    }
  });

  const months = Object.keys(monthCategory)
    .sort()
    .reverse();

  return (
    <div>
      {months.length > 0 &&
        months.map(month => (
          <div key={month}>
            <div>{month}</div>
            <div>
              {monthCategory[month].map(drug => (
                <div key={drug.name}>{drug.name}</div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default PastDrugList;
