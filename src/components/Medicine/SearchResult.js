import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: start;
`;

const InfoContainer = styled.div`
  width: 400px;
  margin-right: 1rem;
`;

const ItemName = styled.div`
  font-weight: bold;
  font-size: 1.6rem;
`;

const SearchResult = props => {
  const drug = props.drug;
  const drugDetail = drug.package_insert.DRB_ITEM;
  console.log(drug);

  return (
    <Container>
      <InfoContainer>
        <ItemName>{drug.name}</ItemName>
        <div>{drugDetail.CHART}</div>
        <div>{drugDetail.CLASS_NO}</div>
      </InfoContainer>
      <img src={drug.pics[0]} width="150px" />
    </Container>
  );
};

export default SearchResult;
