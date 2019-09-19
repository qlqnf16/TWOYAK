import React from "react";
import Pagination from "react-paginate";

function PaginationComponent(props) {
  const handlePageClick = page => {
    console.log(page);
    props.setPage(page);
  };

  return (
    <Pagination
      previousLabel={"이전"}
      nextLabel={"다음"}
      breakLabel={"..."}
      pageCount={props.pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
    />
  );
}

export default PaginationComponent;
