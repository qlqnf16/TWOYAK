import React, { useState, useEffect } from "react";
import axios from "../apis";
import styled, { keyframes } from "styled-components";

import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../components/RecommendSupplementProducts/ProductCard";
import PaginationComponent from "../components/RecommendSupplementProducts/Pagination";
import {
  Container,
  BasicButton,
  Line,
  BasicText
} from "../components/UI/SharedStyles";
import Spinner from "../components/UI/Spinner";
import { ReactComponent as Arrow } from "../assets/images/arrow.svg";

const Background = styled(InfiniteScroll)`
  width: 100%;
  height: 100vh;
  background-color: #f0f9ff;
  z-index: -1;
  overflow: auto;
  padding-bottom: 100px;
  margin-top: 40px;
`;

const RecommendProductContainer = styled(Container)`
  display: block;
  padding-bottom: 0;
  text-align: justify;
  margin-bottom: 100px;
`;

const Title = styled.div`
  padding-top: 1rem;
  font-size: 1.125rem;
  font-weight: 800;
  color: var(--twoyak-black);
`;

const IngrButton = styled(BasicButton)`
  margin: 0.8125rem 0 0 0;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const EffectWrapper = styled.div`
  margin-top: 1rem;
`;

const EffectDescription = styled.div`
  font-size: 0.625rem;
  opacity: 0.6;
  color: #474747;
`;

const Divider = styled(Line)`
  width: 100%;
  margin-top: 1.375rem;
  margin-bottom: 1.375rem;
`;

const PageNation = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const PageNumberClicked = styled.div`
  font-weight: 800;
  font-size: 1.25rem;
  color: var(--twoyak-blue);
`;

const PageNumberUnclicked = styled.div`
  font-weight: 600;
  font-size: 1rem;
  height: 1rem;
  color: var(--twoyak-black);
`;

const FilterContainer = styled.div`
  margin: 1rem 0.3rem 1rem 0.3rem;
  align-self: flex-start;
  position: relative;
`;

const Filters = styled.div`
  position: absolute;
  top: 1.7rem;
  left: 0;
  width: auto;
  height: 4rem;
  z-index: 50;
  padding-left: 0.4rem;
  border-radius: 5px;
  border: solid 1px #00a2ff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #ffffff;
  padding: 5px;
`;

const ArrowIcon = styled(Arrow)`
  margin-left: 0.5rem;
`;

const SelectIngrTypeContainer = styled.div`
  width: 100%;
  max-width: 500px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  grid-gap: 0 1rem;
`;

const IngrTypeSelector = styled.div`
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  position: fixed;
  top: 70px;
  left: 0;
  z-index: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid 0.5px #c4c4c4;
`;

const Filter = styled.div``;

const move = keyframes`
  0% {top: 70px}
  100% {top: 110px}
`;

const IngrTypeArea = styled.div`
  width: 100%;
  position: fixed;
  display: ${({ show }) => (show ? "block" : "none")};
  left: 0;
  z-index: 300;
  background-color: #ffffff;
  animation: ${move} 0.5s linear;
`;

const IngrType = styled.div`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
`;

const EndMessageDiv = styled.div`
  text-align: center;
  font-size: 1rem;
  margin: 0;
  padding: 0;
  font-weight: 800;
`;

function RecommendSupplementProducts(props) {
  const vitaminIngrIds = [475, 476, 9, 10, 49, 50, 51, 55, 56, 57];
  const vitaminIngrNames = [
    "종합비타민",
    "비타민B컴플렉스",
    "비타민A",
    "비타민D",
    "비타민E",
    "비타민K",
    "비타민B1",
    "비타민B6",
    "엽산",
    "비타민B12"
  ];
  const mineralIngrIds = [59, 60, 61, 69];
  const mineralIngrNames = ["칼슘", "마그네슘", "철", "아연"];
  const nutrientIngrIds = [41, 93, 65, 12, 330];
  const nutrientIngrNames = [
    "베타카로틴",
    "코엔자임Q10",
    "프락토올리고당",
    "프로바이오틱스",
    "자일로올리고당"
  ];
  const [
    recommendSupplementIngrsIds,
    setRecommendSupplementsIngrsIds
  ] = useState(
    props.match.path === "/recommend-all-supplements/:type"
      ? props.match.params.type === "vitamins"
        ? vitaminIngrIds
        : props.match.params.type === "minerals"
        ? mineralIngrIds
        : nutrientIngrIds
      : props.match.params.ingrs_ids.split("&")
  );
  const [
    recommendSupplementIngrsNames,
    setRecommendSupplementsIngrsNames
  ] = useState(
    props.match.path === "/recommend-all-supplements/:type"
      ? props.match.params.type === "vitamins"
        ? vitaminIngrNames
        : props.match.params.type === "minerals"
        ? mineralIngrNames
        : nutrientIngrNames
      : props.match.params.ingr_names.split("&")
  );
  const [shoppingSite, setShoppingSite] = useState("iherb");
  const [benefits, setBenefits] = useState([]);
  const [selectedIngrIndex, setSelectedIngrIndex] = useState(0);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [pagenationNumber, setPagenationNumber] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [type, setType] = useState(
    props.match.path === "/recommend-all-supplements/:type"
      ? props.match.params.type === "vitamins"
        ? "비타민"
        : props.match.params.type === "minerals"
        ? "미네랄"
        : "영양제"
      : "비타민"
  );
  const [showTypeFilter, setShowTypeFilter] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      url: `/supplements?page=1&supplement_ingr_id=${recommendSupplementIngrsIds[selectedIngrIndex]}&shopping_site=${shoppingSite}`
    })
      .then(async response => {
        setRecommendedProducts(response.data.data);
        setPagenationNumber(Number(response.headers["total-count"]));
      })
      .catch(error => alert(error));
    recommendSupplementIngrsIds.map(async i => {
      let benefitsArray = benefits;
      axios({
        method: "GET",
        url: `/supplement_ingrs/${i}`
      })
        .then(async response => {
          await benefitsArray.push(JSON.parse(response.data.benefits));
          setBenefits(benefitsArray);
        })
        .catch(error => alert(error.response.data.errors[0]));
    });
  }, [recommendSupplementIngrsIds, selectedIngrIndex, shoppingSite]);

  const fetchMoreData = () => {
    if (recommendedProducts.length >= pagenationNumber) {
      setHasMore(false);
    }
    setTimeout(() => {
      axios({
        method: "GET",
        url: `/supplements?page=${page + 1}&supplement_ingr_id=${
          recommendSupplementIngrsIds[selectedIngrIndex]
        }&shopping_site=${shoppingSite}`
      }).then(response => {
        setRecommendedProducts(recommendedProducts.concat(response.data.data));
        setPage(page + 1);
      });
    }, 1000);
  };

  const changeSupplementHandler = type => {
    switch (type) {
      case "vitamins":
        {
          setRecommendSupplementsIngrsIds(vitaminIngrIds);
          setRecommendSupplementsIngrsNames(vitaminIngrNames);
          setType("비타민");
          setShowTypeFilter(!showTypeFilter);
          setSelectedIngrIndex(0);
        }
        break;
      case "minerals":
        {
          setRecommendSupplementsIngrsIds(mineralIngrIds);
          setRecommendSupplementsIngrsNames(mineralIngrNames);
          setType("미네랄");
          setShowTypeFilter(!showTypeFilter);
          setSelectedIngrIndex(0);
        }
        break;
      case "nutrients": {
        setRecommendSupplementsIngrsIds(nutrientIngrIds);
        setRecommendSupplementsIngrsNames(nutrientIngrNames);
        setType("영양제");
        setShowTypeFilter(!showTypeFilter);
        setSelectedIngrIndex(0);
      }
    }
    document.getElementById("after-pagenation-location").scrollIntoView();
    props.history.push(`/recommend-all-supplements/${type}`);
  };

  let RecommendIngrs = null;
  if (props.match.path === "/recommend-all-supplements/:type") {
    RecommendIngrs = (
      <SelectIngrTypeContainer>
        <IngrTypeSelector onClick={() => setShowTypeFilter(!showTypeFilter)}>
          <Filter>{type}</Filter>
          <ArrowIcon />
        </IngrTypeSelector>
        <IngrTypeArea show={showTypeFilter}>
          <IngrType
            onClick={() => {
              changeSupplementHandler("vitamins");
            }}
          >
            비타민
          </IngrType>
          <IngrType
            onClick={() => {
              changeSupplementHandler("minerals");
            }}
          >
            미네랄
          </IngrType>
          <IngrType
            onClick={() => {
              changeSupplementHandler("nutrients");
            }}
          >
            영양제
          </IngrType>
        </IngrTypeArea>
        {recommendSupplementIngrsNames.map((i, k) => (
          <IngrButton
            style={
              selectedIngrIndex === k ? { opacity: "1" } : { opacity: "0.35" }
            }
            key={k}
            onClick={() => {
              setSelectedIngrIndex(k);
              setPage(1);
            }}
          >
            {i}
          </IngrButton>
        ))}
      </SelectIngrTypeContainer>
    );
  } else {
    RecommendIngrs = (
      <>
        {recommendSupplementIngrsNames.map((i, k) => (
          <IngrButton
            style={
              selectedIngrIndex === k ? { opacity: "1" } : { opacity: "0.35" }
            }
            key={k}
            onClick={() => {
              setSelectedIngrIndex(k);
              setPage(1);
            }}
          >
            {i}
          </IngrButton>
        ))}
      </>
    );
  }

  return (
    <Background
      id="after-pagenation-location"
      dataLength={recommendedProducts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Spinner />}
      endMessage={<EndMessageDiv>준비된 제품을 모두 보셨습니다.</EndMessageDiv>}
    >
      <RecommendProductContainer>
        {props.match.path === "/recommend-all-supplements/:type" ? null : (
          <Title>추천 건강기능식품 성분</Title>
        )}
        {RecommendIngrs}
        <EffectWrapper>
          <EffectDescription>
            {recommendSupplementIngrsNames[selectedIngrIndex]}의 효능
          </EffectDescription>
          {benefits.length > 0 &&
            benefits[selectedIngrIndex].map((i, k) => (
              <EffectDescription key={k}>{i}</EffectDescription>
            ))}
        </EffectWrapper>
        <Divider />
        <FilterContainer onClick={() => setShowFilter(!showFilter)}>
          <BasicText size="0.75rem" color="var(--twoyak-blue)">
            {shoppingSite === "iherb"
              ? "아이허브 판매량 순위"
              : "쿠팡 판매량 순위"}
          </BasicText>
          <ArrowIcon />
          {showFilter && (
            <Filters>
              <BasicText
                size="0.7rem"
                bold
                onClick={() => setShoppingSite("iherb")}
              >
                아이허브 판매량 순위
              </BasicText>
              <BasicText
                size="0.7rem"
                bold
                onClick={() => setShoppingSite("coupang")}
              >
                쿠팡 판매량 순위
              </BasicText>
            </Filters>
          )}
          <BasicText
            size="0.5rem"
            style={{
              fontSize: "0.4rem",
              marginLeft: "0.5rem",
              color: "#474747"
            }}
          >
            가격 정보는 실제와 차이가 날 수 있습니다.
          </BasicText>
        </FilterContainer>

        {recommendedProducts.map((i, k) => (
          <ProductCard
            key={k}
            supplier={shoppingSite}
            name={i.attributes.name}
            src={i.attributes.photo_url}
            productURL={i.attributes.product_url}
            rating={i.attributes.rating}
            reviewCount={i.attributes.shoppingmall_reviews}
            manufacturer={i.attributes.enterprise_name}
            price={i.attributes.price}
            ranking={
              JSON.parse(i.attributes.rankings).data[0].attributes.ranking
            }
          />
        ))}

        {/* {loading ? (
          <Spinner />
        ) : (
          recommendedProducts.map((i, k) => (
            <ProductCard
              key={k}
              supplier={shoppingSite}
              name={i.attributes.name}
              src={i.attributes.photo_url}
              productURL={i.attributes.product_url}
              rating={i.attributes.rating}
              reviewCount={i.attributes.shoppingmall_reviews}
              manufacturer={i.attributes.enterprise_name}
              price={i.attributes.price}
              ranking={
                JSON.parse(i.attributes.rankings).data[0].attributes.ranking
              }
            />
          )) */}
        {/* )} */}
        {/* <PaginationComponent
          page={page}
          paginationNumber={pagenationNumber}
          setPage={k => setPage(k)}
          item={12}
        /> */}
      </RecommendProductContainer>
      {/* </InfiniteScroll> */}
    </Background>
  );
}

export default RecommendSupplementProducts;
