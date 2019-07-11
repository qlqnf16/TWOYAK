import React, { useContext } from "react";
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
  float: left;
  overflow: hidden;
  border-radius: 10px;
  border: solid 1px #979797;
  margin-top: 0.62rem;
  margin-bottom: 1rem;
`;

const Img = styled.img`
  object-fit: cover;
  width: auto;
  height: 100%;
`;

const Button = styled(BasicButton)`
  font-size: 0.75rem;
  opacity: 0.5;
`;

const TextContainer = styled.div`
  font-size: 0.75rem;
  width: 86%;
  padding: 1.25rem 0;
  border-bottom: 1px solid #8bd2ff;
`;

const Text = styled.div`
  font-weight: ${props => (props.bold ? "bold" : "regular")};
  font-size: ${props => (props.big ? "0.875rem" : "0.75rem")};
`;

const SearchResult = React.memo(({ drug, drugImg, modalOn }) => {
  const drugDetail = drug.package_insert ? drug.package_insert.DRB_ITEM : null;
  const { state: authState } = useContext(AuthContext);

  const addCurrentDrug = async () => {
    try {
      await axios.post(
        `user/${authState.subUsers[0].id}/current_drugs/${drug.id}`,
        {
          headers: {
            Authorization: `bearer ${authState.token}`
          }
        }
      );
      alert("추가됐습니다");
    } catch (error) {
      console.log(error);
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
      drugDetail.EE_DOC_DATA && drugDetail.EE_DOC_DATA.DOC.SECTION;
    const title = [];
    const PARAGRAPH = [];

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
    return {
      benefitTitle: title,
      benefitParagraph: PARAGRAPH
    };
  };

  const benefitInfo = findInfoDetail(drug);

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
              <Text style={{ fontSize: "0.7rem" }}>
                주효능:{" "}
                {!benefitInfo.benefitParagraph.length
                  ? benefitInfo.benefitTitle
                  : benefitInfo.benefitParagraph}
              </Text>
            </TextContainer>
            <div>{drugDetail.CLASS_NO}</div>
          </>
        )}
      </InfoContainer>
      <div onClick={addCurrentDrug}>복용목록에 추가하기</div>
    </Container>
  );
});

export default React.memo(SearchResult);
