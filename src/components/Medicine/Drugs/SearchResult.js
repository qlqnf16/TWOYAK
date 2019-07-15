import React, { useContext, useState } from "react";
import styled from "styled-components";
import { breakpoints, BasicButton } from "../../UI/SharedStyles";
import { AuthContext } from "../../../contexts/AuthStore";
import axios from "../../../apis";
import Warning from "../../UI/Warning";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;

  @media (max-width: ${breakpoints.medium}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemName = styled.div`
  font-weight: bold;
  font-size: 1.125rem;
`;

const ImgContainer = styled.div`
  width: 40%;
  height: 109px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  border: solid 1px #979797;
  margin-top: 0.62rem;
  margin-bottom: 1rem;
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-height: 109px;
  max-width: 100%;
`;

const Button = styled(BasicButton)`
  font-size: 0.75rem;
  opacity: 0.5;
  margin-top: 1rem;
`;

const AddButton = styled(BasicButton)`
  position: fixed;
  bottom: 70px;
`;

const TextContainer = styled.div`
  font-size: 0.75rem;
  width: 86%;
  border-bottom: 1px solid #00a2ff40;
  margin-bottom: 1rem 0;
`;

const Text = styled.div`
  font-weight: ${props => (props.bold ? "bold" : "regular")};
  font-size: ${props => (props.big ? "0.875rem" : "0.75rem")};
  margin: 1rem 0;
`;

const Benefit = styled.div`
  max-height: ${props => !props.more && "3.6em"};
  white-space: ${props => (props.more ? "pre-wrap" : "nowrap")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.2;
`;

const ShowMoreButton = styled.div`
  font-weight: bold;
  text-align: right;
  margin-bottom: 1rem;
  color: var(--twoyak-blue);
`;

const SearchResult = React.memo(
  ({ drug, drugImg, modalOn, showMore, toggleShowMore }) => {
    const drugDetail = drug.package_insert
      ? drug.package_insert.DRB_ITEM
      : null;
    const { state: authState } = useContext(AuthContext);

    const addCurrentDrug = async () => {
      try {
        await axios({
          method: "POST",
          url: `user/${authState.subUsers[0].id}/current_drugs/${drug.id}`,
          headers: {
            Authorization: `bearer ${authState.token}`
          }
        });
        alert("추가됐습니다");
      } catch (error) {
        console.log(error.response);
      }
    };

    const pushValidItem = (array, item) => {
      if (item !== undefined && item !== null && item !== "") {
        array.push(item);
      }
    };

    const findInfoDetail = drug => {
      // 효능, 효과
      const SECTION =
        drugDetail &&
        drugDetail.EE_DOC_DATA &&
        drugDetail.EE_DOC_DATA.DOC.SECTION;

      const title = [];
      const PARAGRAPH = [];

      if (SECTION !== null) {
        if (!SECTION.length) {
          if (!SECTION.ARTICLE.length) {
            pushValidItem(title, SECTION.ARTICLE.title);
            pushValidItem(PARAGRAPH, SECTION.ARTICLE.PARAGRAPH);
          } else {
            for (let i = 0; i < SECTION.ARTICLE.length; i++) {
              pushValidItem(title, SECTION.ARTICLE[i].title);
              pushValidItem(PARAGRAPH, SECTION.ARTICLE[i].PARAGRAPH);
            }
          }
        } else {
          for (let i = 0; i < SECTION.length; i++) {
            if (!SECTION[i].ARTICLE.length) {
              pushValidItem(title, SECTION[i].ARTICLE.title);
              pushValidItem(PARAGRAPH, SECTION[i].ARTICLE.PARAGRAPH);
            } else {
              for (let j = 0; j < SECTION[i].ARTICLE.length; j++) {
                pushValidItem(title, SECTION[i].ARTICLE[j].title);
                pushValidItem(PARAGRAPH, SECTION[i].ARTICLE[j].PARAGRAPH);
              }
            }
          }
        }
      }
      return {
        benefitTitle: title,
        benefitParagraph: PARAGRAPH
      };
    };

    const benefitInfo = findInfoDetail(drug);
    const benefitText = !benefitInfo.benefitParagraph.length
      ? benefitInfo.benefitTitle.join("\n")
      : benefitInfo.benefitParagraph.join("\n");
    const benefitTextShortend = !benefitInfo.benefitParagraph.length
      ? benefitInfo.benefitTitle[0]
      : benefitInfo.benefitParagraph[0];

    return (
      <Container>
        <Warning />
        <InfoContainer>
          <ItemName>{drug.name.split("(")[0]}</ItemName>
          {drugImg && (
            <ImgContainer>
              <Img src={drugImg} alt={drug.name} />
            </ImgContainer>
          )}
          {drugDetail && (
            <>
              <Button onClick={modalOn}>설명서 보기</Button>
              <TextContainer>
                <Text bold>어떤 약인가요?</Text>
                {showMore ? (
                  <>
                    <Benefit more>주효능: {benefitText}</Benefit>
                    <ShowMoreButton onClick={toggleShowMore}>
                      접기
                    </ShowMoreButton>
                  </>
                ) : (
                  <>
                    <Benefit>주효능: {benefitTextShortend}</Benefit>
                    <ShowMoreButton onClick={toggleShowMore}>
                      더보기
                    </ShowMoreButton>
                  </>
                )}
              </TextContainer>
              <TextContainer>
                <Text bold>주요 성분</Text>
                <Text>
                  {drug.ingr_kor_name.join(", ")}
                  {drug.ingr_eng_name &&
                    ` (${drug.ingr_eng_name.slice(1, -1)})`}
                </Text>
              </TextContainer>
            </>
          )}
        </InfoContainer>
        <AddButton onClick={!drug.taking ? addCurrentDrug : null}>
          {!drug.taking ? "복용목록에 추가하기" : "복용중인 약품입니다"}
        </AddButton>
      </Container>
    );
  }
);

export default React.memo(SearchResult);
