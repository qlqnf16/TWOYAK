import React from "react";
import styled from "styled-components";
import { thumbnail } from "./ContentDummy";

const ContentsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const ThumbnailContainer = styled.div`
  width: 50%;
  height: 15rem;
  border-radius: 13px;
  box-shadow: 1px 2px 7px 1px rgba(212, 212, 212, 0.5);
  margin-top: 1.375rem;
`;

const ThumbnailTitle = styled.div`
  width: 100%;
  height: 30%;
  font-size: 0.7rem;
  font-weight: 700;
  line-height: 1.6rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
`;

const ThumbnailImg = styled.img`
  width: 100%;
  height: 70%;
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
