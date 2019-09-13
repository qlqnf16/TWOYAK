import React from "react";
import styled from "styled-components";
import { breakpoints, BasicButton, BasicText } from "../../UI/SharedStyles";
import Warning from "../../UI/Warning";
import emptyHeart from "../../../assets/images/heart-none.svg";
import fullHeart from "../../../assets/images/heart-fill.svg";
import DurInfo from "./DurInfo";
import SupplementInfo from "./SupplementInfo";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10rem;

  /* @media (max-width: ${breakpoints.medium}) { */
    flex-direction: column;
    justify-content: center;
    align-items: center;
  /* } */
`;

const InfoContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 4px;
  left: 83%;
`;

const Icon = styled.img`
  width: 20px;
`;

const ItemName = styled.div`
  width: 55%;
  text-align: center;
  font-weight: bold;
  font-size: 1.125rem;
`;

const ImgContainer = styled.div`
  width: 40%;
  height: fit-content;
  min-height: 109px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  border: solid 1px #979797;
  margin-top: 0.62rem;
  margin-bottom: 1rem;
  background-color: rgba(0,0,0,0.03);
  text-align: center;
  font-size: 0.7rem;
  color: var(--twoyak-black);
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 300px;
`;

const Button = styled.a`
  font-size: 0.75rem;
  opacity: 0.5;
  border-radius: 1.5rem;
  background-color: #00a2ff;
  padding: 0.5rem 1.3rem;
  color: white;
  font-weight: 800;
  margin: 1rem auto 0 auto;
  text-decoration: none;
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
  padding: 1rem 0;
`;

const Text = styled.div`
  font-weight: ${props => (props.bold ? "bold" : "regular")};
  font-size: ${props => (props.big ? "0.875rem" : "0.75rem")};
  margin-bottom: 1rem;
`;

const Benefit = styled.div`
  max-height: ${props => !props.more && "4.5em"};
  white-space: ${props => (props.more ? "pre-wrap" : "nowrap")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

const ShowMoreButton = styled.div`
  font-weight: bold;
  text-align: right;
  color: var(--twoyak-blue);
`;

const StyledWrapper = styled.div`
  @media (min-width: ${breakpoints.medium}) {
    width: 86%;
    margin-bottom: 1rem;
  }
`

const SearchResult = React.memo(
  ({
    drug, drugImg, durInfo,
    showMore, toggleShowMore, watching,
    showLogin, toggleWatching, history,
    additionalModalToggle, auth, moveTo
  }) => {
    const drugDetail = drug.package_insert
      ? JSON.parse(
        JSON.stringify(drug.package_insert.DRB_ITEM).replace(
          /&nbsp;|&#8226|&amp;|&lt;|&gt;|u0026nbsp;|'\"'|(<.*?>)/gi,
          ""
        )
      )
      : null;

    const pushValidItem = (array, item) => {
      if (item !== undefined && item !== null && item.length > 0) {
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
            if (!SECTION[i].ARTICLE || !SECTION[i].ARTICLE.length) {
              if (SECTION[i].ARTICLE) {
                pushValidItem(title, SECTION[i].ARTICLE.title);
                pushValidItem(PARAGRAPH, SECTION[i].ARTICLE.PARAGRAPH);
              }
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
      ? benefitInfo.benefitTitle.join(" ")
      : benefitInfo.benefitParagraph.join(" ");
    let benefitTextShortend = !benefitInfo.benefitParagraph.length
      ? benefitInfo.benefitTitle[0]
      : benefitInfo.benefitParagraph[0];
    benefitTextShortend = benefitTextShortend === benefitText ? benefitTextShortend.slice(0, 110) : benefitTextShortend

    const ingrKo = new Set(drug.ingr_kor_name);

    return (
      <Container>
        <StyledWrapper>
          <Warning />
        </StyledWrapper>
        <InfoContainer>
          <ItemName>{drug.name.split("(")[0]}</ItemName>
          <IconContainer>
            {watching ? (
              // 여기
              <Icon src={fullHeart} alt="full-heart" onClick={toggleWatching} />
            ) : (
                <Icon
                  src={emptyHeart}
                  alt="empty-heart"
                  onClick={auth ? toggleWatching : showLogin}
                />
              )}
          </IconContainer>
          <ImgContainer>
            {drugImg ?
              drugImg === 'x' ? '의약품 사진이 없습니다. ' :
                <Img src={drugImg} alt={drug.name} /> :
              '로딩중..'}
          </ImgContainer>
          {drugDetail && (
            <>
              <Button
                href={`https://nedrug.mfds.go.kr/pbp/CCBBB01/getItemDetail?itemSeq=${drug.item_seq}`}
                target="_blank"
              >
                설명서 보기
              </Button>
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
                      {benefitTextShortend !== benefitText && (
                        <ShowMoreButton onClick={toggleShowMore}>
                          더보기
                      </ShowMoreButton>
                      )}
                    </>
                  )}
              </TextContainer>
              <TextContainer>
                <Text bold>주요 성분</Text>
                <Benefit>
                  {Array.from(ingrKo).join(",")}
                  {drug.ingr_eng_name &&
                    ` (${drug.ingr_eng_name.slice(1, -1)})`}
                </Benefit>
              </TextContainer>
              {durInfo || (drug.dur_info && !!Object.entries(drug.dur_info).length) ? (
                <TextContainer>
                  <DurInfo dur={drug.dur_info} interaction={durInfo} />
                </TextContainer>
              ) : ''}
              {!!drug.interactions.length && (
                <TextContainer>
                  <SupplementInfo supplements={drug.interactions} moveTo={moveTo} />
                </TextContainer>
              )}
            </>
          )}
        </InfoContainer>
        {auth && (
          <AddButton
            onClick={
              drug.currently_taking
                ? () => {
                  additionalModalToggle("delete");
                }
                : () => {
                  additionalModalToggle("add");
                }
            }
          >
            {drug.currently_taking
              ? "복용목록에서 제거하기"
              : "복용목록에 추가하기"}
          </AddButton>
        )}
      </Container>
    );
  }
);

export default React.memo(SearchResult);
