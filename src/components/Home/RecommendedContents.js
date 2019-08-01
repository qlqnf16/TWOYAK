import React from "react";
import styled from "styled-components";
import { thumbnail } from "./ContentDummy";

const ContentsContainer = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 6px;
  grid-auto-rows: minmax(100px, auto);
  margin-top: 1rem;
`;

const ThumbnailContainer = styled.div`
  width: 100%;
  height: 11rem;
  /* border-radius: 13px; */
  /* box-shadow: 1px 2px 7px 1px rgba(212, 212, 212, 0.5); */
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
  /* border-top-left-radius: 13px; */
  /* border-top-right-radius: 13px; */
`;

function RecommendedContents({ history }) {
  const showContentHandler = id => {
    history.push(`/content/${id}`);
  };

  return (
    <ContentsContainer>
      {thumbnail.map((i, k) => (
        <ThumbnailContainer key={k} onClick={() => showContentHandler(k)}>
          <ThumbnailImg src={i.src} />
          <ThumbnailTitle>{i.title}</ThumbnailTitle>
        </ThumbnailContainer>
      ))}
    </ContentsContainer>
  );
}

export default RecommendedContents;
