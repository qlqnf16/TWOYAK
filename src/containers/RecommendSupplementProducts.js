import React, { useState, useEffect } from "react";
import axios from "../apis";
import styled from "styled-components";

import ProductCard from "../components/RecommendSupplementProducts/ProductCard";
import {
  Container,
  BasicButton,
  Line,
  BasicText
} from "../components/UI/SharedStyles";
import Spinner from "../components/UI/Spinner";
import { ReactComponent as Arrow } from "../assets/images/arrow.svg";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f0f9ff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: auto;
  padding-bottom: 100px;
`;

const RecommendProductContainer = styled(Container)`
  display: block;
  padding-bottom: 0;
`;

const IngrWrapper = styled.div``;

const Title = styled.div`
  padding-top: 1rem;
  font-size: 1.125rem;
  font-weight: 800;
  color: var(--twoyak-black);
`;

const IngrButton = styled(BasicButton)`
  margin-right: 1rem;
  margin-top: 0.8125rem;
`;

const EffectWrapper = styled.div`
  margin-top: 0.5rem;
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
  margin-bottom: 100px;
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
  margin: 1rem;
  align-self: flex-start;
  position: relative;
`;

const Filters = styled.div`
  position: absolute;
  top: 1.7rem;
  left: 0;
  width: 4rem;
  z-index: 50;
  padding-left: 0.4rem;
  border-radius: 5px;
  border: solid 1px #00a2ff;
  background-color: #ffffff;
`;

const ArrowIcon = styled(Arrow)`
  margin-left: 0.5rem;
`;

function RecommendSupplementProducts(props) {
  const recommendSupplementIngrsIds = props.match.params.ingrs_ids.split("&");
  const recommendSupplementIngrsNames = props.match.params.ingr_names.split(
    "&"
  );
  const [shoppingSite, setShoppingSite] = useState("iherb");
  const [benefits, setBenefits] = useState([]);
  const [selectedIngrIndex, setSelectedIngrIndex] = useState(0);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [pagenationArray, setPagenationArray] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `/supplements?page=${page}&supplement_ingr_id=${recommendSupplementIngrsIds[selectedIngrIndex]}&shopping_site=${shoppingSite}`
    })
      .then(async response => {
        console.log(response);
        setRecommendedProducts(response.data.data);
        let tempPagenation = [];
        for (
          let i = 1;
          i < parseInt(Number(response.headers["total-count"]) / 12 + 1);
          i++
        ) {
          await tempPagenation.push(i);
        }
        setPagenationArray(tempPagenation);
        setLoading(false);
      })
      .catch(error => alert(error.response.data.errors[0]));
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
  }, [page, selectedIngrIndex, shoppingSite]);

  console.log(pagenationArray);

  return (
    <Background>
      <RecommendProductContainer>
        <Title>추천 건강기능식품 성분</Title>
        <IngrWrapper>
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
        </IngrWrapper>
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
            {shoppingSite === "iherb" ? "아이허브 랭킹" : "쿠팡 랭킹"}
          </BasicText>
          <ArrowIcon />
          {showFilter && (
            <Filters>
              <BasicText
                size="0.7rem"
                bold
                onClick={() => setShoppingSite("iherb")}
              >
                아이허브
              </BasicText>
              <BasicText
                size="0.7rem"
                bold
                onClick={() => setShoppingSite("coupang")}
              >
                쿠팡
              </BasicText>
            </Filters>
          )}
          <BasicText
            size="0.5rem"
            style={{ marginLeft: "0.5rem", color: "#474747" }}
          >
            가격 정보는 실제와 차이가 날 수 있습니다.
          </BasicText>
        </FilterContainer>
        {loading ? (
          <Spinner />
        ) : (
          recommendedProducts.map((i, k) => (
            <ProductCard
              key={k}
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
          ))
        )}
        <PageNation>
          {pagenationArray &&
            pagenationArray.map((i, k) =>
              i === page ? (
                <PageNumberClicked key={k}>{i}</PageNumberClicked>
              ) : (
                <PageNumberUnclicked key={k} onClick={() => setPage(i)}>
                  {i}
                </PageNumberUnclicked>
              )
            )}
        </PageNation>
      </RecommendProductContainer>
    </Background>
  );
}

export default RecommendSupplementProducts;
