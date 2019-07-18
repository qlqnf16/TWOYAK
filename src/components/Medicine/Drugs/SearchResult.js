import React from "react";
import styled from "styled-components";
import { breakpoints, BasicButton, BasicText } from "../../UI/SharedStyles";
import Warning from "../../UI/Warning";
import emptyHeart from "../../../assets/images/heart-none.svg";
import fullHeart from "../../../assets/images/heart-fill.svg";

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

const SearchResult = React.memo(
  ({
    drug,
    drugImg,
    modalOn,
    showMore,
    toggleShowMore,
    watching,
    toggleWatching,
    additionalModalToggle
  }) => {
    const drugDetail = drug.package_insert
      ? drug.package_insert.DRB_ITEM
      : null;

    const pushValidItem = (array, item) => {
      if (
        item !== undefined &&
        item !== null &&
        item !== "" &&
        !item.includes("nbsp")
      ) {
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

    const ingrKo = new Set(drug.ingr_kor_name);

    const durInfo = [];
    const dur = drug.dur_info;
    if (dur.pregnancy) durInfo.push("임산부");
    else if (dur.age) durInfo.push(dur.age[0].description);
    else if (dur.elder) durInfo.push("65세 이상 고령자");

    return (
      <Container>
        <Warning />
        <InfoContainer>
          <ItemName>{drug.name.split("(")[0]}</ItemName>
          <IconContainer>
            {watching ? (
              <Icon src={fullHeart} alt="full-heart" onClick={toggleWatching} />
            ) : (
              <Icon
                src={emptyHeart}
                alt="empty-heart"
                onClick={toggleWatching}
              />
            )}
          </IconContainer>
          {drugImg && (
            <ImgContainer>
              <Img src={drugImg} alt={drug.name} />
            </ImgContainer>
          )}
          {drugDetail && (
            <>
              <Button
                onClick={() => {
                  modalOn();
                }}
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
              {dur.excluded && (
                <TextContainer>
                  <Text bold>복용 중지된 의약품입니다!</Text>
                </TextContainer>
              )}
              {dur.length > 0 && (
                <TextContainer>
                  <Text bold>이런 분들은 드실 때 주의해야 해요!</Text>
                  {durInfo.map(d => (
                    <BasicText size="0.75rem" bold key={d}>
                      {d}
                    </BasicText>
                  ))}
                </TextContainer>
              )}
            </>
          )}
        </InfoContainer>
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
      </Container>
    );
  }
);

export default React.memo(SearchResult);
