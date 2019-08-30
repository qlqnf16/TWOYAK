import React, { useState, useEffect } from "react";
import axios from "../apis";
import styled from "styled-components";

import ProductCard from "../components/RecommendSupplementProducts/ProductCard";
import { Container, BasicButton, Line } from "../components/UI/SharedStyles";

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
  margin-bottom: 0;
`;

const IngrWrapper = styled.div``;

const Title = styled.div`
  padding-top: 1rem;
  font-size: 1.125rem;
  font-weight: 800;
  color: var(--twoyak-black);
`;

const IngrButton = styled(BasicButton)`
  margin-right: 3.1875rem;
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

function RecommendSupplementProducts(props) {
  const recommendSupplementIngrs = props.match.params.ingrs.split("&");
  const [selectedIngrIndex, setSelectedIngrIndex] = useState(0);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://52.79.228.195/supplements?page=2&supplement_ingr_id=12"
    })
      .then(response => {
        setRecommendedProducts(response.data.data);
      })
      .catch(error => alert(error.response.data.errors[0]));
  }, []);

  return (
    <Background>
      <RecommendProductContainer>
        <Title>추천 건강기능식품 성분</Title>
        <IngrWrapper>
          {recommendSupplementIngrs.map((i, k) => (
            <IngrButton
              style={
                selectedIngrIndex === k ? { opacity: "1" } : { opacity: "0.35" }
              }
              key={k}
              onClick={() => setSelectedIngrIndex(k)}
            >
              {i}
            </IngrButton>
          ))}
        </IngrWrapper>
        <EffectWrapper>
          <EffectDescription>
            {recommendSupplementIngrs[selectedIngrIndex]}의 효능
          </EffectDescription>
          <EffectDescription>
            - 칼슘과 인이 흡수되고 이용되는데 필요
          </EffectDescription>
          <EffectDescription>- 뼈의 형성과 유지에 필요</EffectDescription>
          <EffectDescription>- 골다골증발생 위험 감소</EffectDescription>
        </EffectWrapper>
        <Divider />
        {recommendedProducts.map((i, k) => (
          <ProductCard
            key={k}
            name={i.attributes.name}
            src={i.attributes.photo_url}
            productURL={i.attributes.product_url}
            rating={i.attributes.rating}
            reviewCount={i.attributes.shoppingmall_reviews}
            ranking={
              JSON.parse(i.attributes.rankings).data[0].attributes.ranking
            }
            rating={4.35}
          />
        ))}
      </RecommendProductContainer>
    </Background>
  );
}

export default RecommendSupplementProducts;
