import React from "react";
import styled from "styled-components";

import { StyledRating, RatingText } from "../UI/SharedStyles";
import fullHeart from "../../assets/images/heart-fill.svg";
import emptyHeart from "../../assets/images/heart-none.svg";

const Card = styled.div`
  width: 100%;
  height: 10rem;
  border-radius: 13px;
  box-shadow: 1px 2px 7px 1px rgba(212, 212, 212, 0.5);
  background-color: #ffffff;
  margin-bottom: 1.375rem;
`;

const Link = styled.a`
  text-decoration: none;
`;

const Header = styled.div`
  display: flex;
  padding: 0.8125rem;
  justify-content: space-between;
`;

const Ranking = styled.div`
  font-size: 1rem;
  font-weight: 800;
  color: var(--twoyak-blue);
`;

const RatingContainer = styled.div`
  display: flex;
`;

const Rating = styled(StyledRating)`
  margin: 0 -2px;
  font-size: 10px;
  .custom {
    margin: 0 2px;
  }
`;

const ReviewCount = styled.div`
  font-size: 0.7rem;
  margin-left: 8px;
  color: #474747;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 0.75rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
`;

const ProductImg = styled.img`
  width: 5.9375rem;
  height: 6rem;
`;

const DescriptionWrapper = styled.div``;

const Manufacturer = styled.div`
  font-size: 0.6875rem;
  color: #474747;
`;

const ProductName = styled.div`
  font-size: 0.6875rem;
  font-weight: 800;
  color: #474747;
  height: 2rem;
  overflow: hidden;
`;

const Price = styled.div`
  font-size: 0.6875rem;
  color: #474747;
`;

const Etc = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.625rem;
`;

const Effect = styled.div`
  width: auto;
  height: auto;
  opacity: 0.6;
  border-radius: 11px;
  border: solid 0.5px var(--twoyak-blue);
  font-size: 0.6875rem;
  padding: 5px;
`;

const Icon = styled.img`
  width: 20px;
`;

function ProductCard(props) {
  return (
    <Card>
      <Link
        href={
          "https://prf.hn/click/camref:1101l4PEu/destination:" +
          props.productURL
        }
      >
        <Header>
          <Ranking>{props.ranking}위</Ranking>
          <RatingContainer>
            <Rating
              emptySymbol="fas fa-circle custom"
              fullSymbol="fas fa-circle custom full"
              fractions={2}
              initialRating={props.rating}
              readonly
            />
            <RatingText margin="0.5rem" opacity="0.5" size="0.7rem" bold>
              {props.rating.toFixed(1)} / 5.0
            </RatingText>
            <ReviewCount>({props.reviewCount})</ReviewCount>
          </RatingContainer>
        </Header>
        <Product>
          <ProductImg src={props.src} alt="product-img" />
          <DescriptionWrapper>
            <Manufacturer>제조사 자리</Manufacturer>
            <ProductName>{props.name}</ProductName>
            <Price>가격 데이터 자리</Price>
            <Etc>
              <Effect>효능 데이터 자리</Effect>
              <Icon src={emptyHeart} alt="interesting product" />
            </Etc>
          </DescriptionWrapper>
        </Product>
      </Link>
    </Card>
  );
}

export default ProductCard;
