import React, { useContext } from "react";
import styled from "styled-components";
import { breakpoints } from "../../UI/SharedStyles";
import { AuthContext } from "../../../contexts/AuthStore";
import axios from "../../../apis";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;

  @media (max-width: ${breakpoints.medium}) {
    display: block;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  margin-right: 1rem;
`;

const ItemName = styled.div`
  font-weight: bold;
  font-size: 1.6rem;
`;

const SearchResult = React.memo(({ drug, drugImg, modalOn }) => {
  const drugDetail = drug.package_insert ? drug.package_insert.DRB_ITEM : null;
  const { state: authState } = useContext(AuthContext);

  const addCurrentDrug = async () => {
    try {
      await axios.post(`user/${authState.userId}/current_drugs/${drug.id}`, {
        headers: {
          Authorization: `bearer ${authState.token}`
        }
      });
      alert("추가됐습니다");
    } catch (error) {
      console.log(error);
    }
  };

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
      <div onClick={addCurrentDrug}>복용목록에 추가하기</div>
    </Container>
  );
});

export default React.memo(SearchResult);
