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

const SearchResult = React.memo(props => {
  const drug = props.drug;
  const drugDetail = drug.package_insert ? drug.package_insert.DRB_ITEM : null;
  console.log(drug);

  return (
    <Container>
      <InfoContainer>
        <ItemName>{drug.name}</ItemName>
        {drugDetail && (
          <>
            <div>{drugDetail.CHART}</div>
            <div>{drugDetail.CLASS_NO}</div>
          </>
        )}
      </InfoContainer>
      <img src={drug.pics[0]} width="150px" alt={drug.name} />
    </Container>
  );
});

export default SearchResult;
