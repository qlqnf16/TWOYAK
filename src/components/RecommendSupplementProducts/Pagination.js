import React, { useEffect } from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

function PaginationComponent(props) {
  const handlePageClick = page => {
    props.setPage(page);
  };

  return (
    <Pagination
      onChange={handlePageClick}
      current={props.page}
      total={props.paginationNumber}
      pageSize={props.item}
      simple
      style={{ display: "flex", justifyContent: "center" }}
    />
  );
}

export default PaginationComponent;
