import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BasicText } from "../../UI/SharedStyles";

const Container = styled.div`
  margin-top: 2rem;
`;

const ItemContainer = styled.div`
  height: 70vh;
  overflow: scroll;
`;

const Title = styled(BasicText)`
  display: block;
  width: fit-content;
  margin: 0 auto 2.3rem auto;
  font-size: 0.94rem;
`;

const BlockText = styled(Link)`
  display: block;
  color: var(--twoyak-black);
  font-size: 0.94rem;
  font-weight: bold;
  text-decoration: none;
  padding: 1rem 0;
  border-bottom: 1px solid var(--twoyak-opacity-blue);
`;

const SmallText = styled(BasicText)`
  display: block;
  font-size: 0.7rem;
  opacity: 0.5;
`;

const BlueSpan = styled.span`
  color: var(--twoyak-blue);
`;

const isEqual = (prevProps, nextProps) => {
  return prevProps.drug_list === nextProps.drug_list;
};

const ItemList = ({ drug_list, term }) => {
  console.log(drug_list);
  const items = drug_list.map(item => (
    <BlockText
      to={`/medicine/${item.current_drug_id}`}
      key={item.current_drug_id}
    >
      {item.name.split("(")[0]}
      <SmallText>
        {item.name.split("(")[1] && `(${item.name.split("(")[1]}`}
      </SmallText>
    </BlockText>
  ));

  return (
    <Container>
      <Title>
        <BlueSpan>'{term}'</BlueSpan>
        {!drug_list.length
          ? "에 대한 검색결과가 없습니다."
          : "과/와 유사한 의약품 목록입니다."}
      </Title>
      <ItemContainer>{items}</ItemContainer>
    </Container>
  );
};

export default React.memo(ItemList, isEqual);
