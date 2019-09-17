import React from "react";
import styled from "styled-components";
import { thumbnail } from "./ContentDummy";
import medIcon from "../../assets/images/med-icon.svg";
import { WhiteButton } from "../../components/UI/SharedStyles";

const ContentsContainer = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 12px 6px;
  grid-auto-rows: minmax(100px, auto);
  margin-top: 1rem;
  align-items: start;
`;

const ThumbnailContainer = styled.div`
  width: 100%;
`;

const ThumbnailTitle = styled.div`
  width: 100%;
  height: 30%;
  font-size: 0.7rem;
  font-weight: 700;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
`;

const ThumbnailImg = styled.img`
  width: 100%;
  height: 70%;
`;

const HomeContent = styled.div`
  margin-top: 2.125rem;
  display: flex;
`;

const Header = styled.div`
  font-size: 1.125rem;
  font-weight: 800;
  margin-left: 0.5rem;
`;

const GoSupplementButton = styled(WhiteButton)`
  width: 100%;
  text-align: center;
`;

const PreliminaryAdContainer = styled.div`
  display: flex;
`;

const PreliminaryAd = styled.img`
  width: 100px;
  height: 100px;
`;

const Manufacturer = styled.div`
  font-size: 10px;
`;

const ProductName = styled.div`
  font-size: 14px;
  font-weight: 800;
`;

const Price = styled.div`
  color: red;
  font-size: 14px;
  font-weight: 900;
`;

function RecommendedContents({ history }) {
  const showContentHandler = id => {
    history.push(`/content/${id}`);
  };

  return (
    <div>
      <HomeContent>
        <img src={medIcon} alt="med-icon" />
        <Header>투약의 건강 이야기</Header>
      </HomeContent>
      <GoSupplementButton
        onClick={() => history.push("/recommend-all-supplements/vitamins")}
      >
        이런 영양제는 어떤가요?
      </GoSupplementButton>
      {/* <PreliminaryAdContainer
        onClick={() => window.open("https://coupa.ng/biJr2B", "_blank")}
      >
        <PreliminaryAd src="//thumbnail12.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/images/2019/03/20/10/4/a7bfddac-040b-4fdc-b174-6156b491917a.jpg" />
        <div>
          <Manufacturer>나우푸드</Manufacturer>
          <ProductName>Now Foods 비타민 C 크리스탈 아스코르브산</ProductName>
          <Price>할인가: 7,940</Price>
        </div>
      </PreliminaryAdContainer> */}
      <ContentsContainer>
        {thumbnail.map((i, k) => (
          <ThumbnailContainer key={k} onClick={() => showContentHandler(k)}>
            <ThumbnailImg src={i.src} />
            <ThumbnailTitle>{i.title}</ThumbnailTitle>
          </ThumbnailContainer>
        ))}
      </ContentsContainer>
    </div>
  );
}

export default RecommendedContents;
