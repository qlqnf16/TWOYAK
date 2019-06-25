import React from "react";
import { Link } from "react-router-dom";

const ItemList = props => {
  console.log(props.drug_list);
  const items = props.drug_list.map(item => (
    <Link to={`/medicine/${item.current_drug_id}`} key={item.current_drug_id}>
      {item.name}
    </Link>
  ));

  return <>{items}</>;
};

export default ItemList;
