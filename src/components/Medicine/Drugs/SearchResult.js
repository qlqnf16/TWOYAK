import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: start;
  width: 570px;
  margin-bottom: 1rem;
`;

const InfoContainer = styled.div`
  width: 400px;
  margin-right: 1rem;
`;

const ItemName = styled.div`
  font-weight: bold;
  font-size: 1.6rem;
`;

const SearchResult = React.memo(({ drug, drugImg, modalOn }) => {
  const drugDetail = drug.package_insert ? drug.package_insert.DRB_ITEM : null;

  return (
    <Container>
      <InfoContainer>
        <ItemName>{drug.name}</ItemName>
        {drugDetail && (
          <>
            <div>{drugDetail.CHART}</div>
            <div>{drugDetail.CLASS_NO}</div>
            <div onClick={modalOn}>설명서 보기</div>
          </>
        )}
      </InfoContainer>
      {drugImg && <img src={drugImg} width="150px" alt={drug.name} />}
    </Container>
  );
});

export default React.memo(SearchResult);
