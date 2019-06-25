import React from "react";

const SearchResult = props => {
  const drug = props.drug_imprint;

  return (
    <div>
      <div>검색어: {drug.name}</div>
      <div>{drug.description}</div>
    </div>
  );
};

export default SearchResult;
