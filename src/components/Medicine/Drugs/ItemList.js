import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BasicText, FlexDiv, BulletText } from "../../UI/SharedStyles";
import { ReactComponent as Add } from "../../../assets/images/plus-in-search.svg";

const Flex = styled(FlexDiv)`
  padding: 1rem 0;
  border-bottom: 1px solid var(--twoyak-opacity-blue);
  justify-content: space-between;
  align-items: center;
`;

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

const ItemList = ({ drug_list, term, addCurrentDrug, currentDrugs }) => {
  const items = drug_list.map(item => (
    <Flex key={item.current_drug_id}>
      <BlockText to={`/medicine/${item.current_drug_id}`}>
        {item.name.split("(")[0]}
        <SmallText>
          {item.name.split("(")[1] && `(${item.name.split("(")[1]}`}
        </SmallText>
      </BlockText>
      {currentDrugs.includes(item.current_drug_id) ? (
        <BasicText size="0.7rem" opacity="0.7">
          복용중
        </BasicText>
      ) : (
        <Add
          onClick={e => {
            e.stopPropagation();
            addCurrentDrug(item.current_drug_id);
          }}
        />
      )}
    </Flex>
  ));

  return (
    <Container>
      <Title>
        <BlueSpan>'{term}'</BlueSpan>
        {!drug_list.length
          ? "에 대한 검색결과가 없습니다."
          : "과/와 유사한 의약품 목록입니다."}
      </Title>
      {!drug_list.length && (
        <>
          <BulletText>
            <p>약품의 철자가 정확한 지 확인해주세요.</p>
          </BulletText>
          <BulletText>
            <p>약품의 이름이 정확한 지 확인해주세요.</p>
          </BulletText>
        </>
      )}
      <ItemContainer>{items}</ItemContainer>
    </Container>
  );
};

export default React.memo(ItemList, isEqual);
