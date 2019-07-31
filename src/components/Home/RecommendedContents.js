import React from "react";
import styled from "styled-components";
import { thumbnail } from "./ContentDummy";

const ThumbnailContainer = styled.div`
  display: flex;
  width: 19.687rem;
  height: 12.937rem;
  border-radius: 13px;
  box-shadow: 1px 2px 7px 1px rgba(212, 212, 212, 0.5);
  margin-top: 1.375rem;
`;

const ThumbnailTitle = styled.div`
  width: 10.0625rem;
  padding: 1.0625rem;
  font-size: 1.125rem;
  font-weight: 800;
  text-align: left;
  line-height: 1.6rem;
`;

const ThumbnailImg = styled.img`
  width: 9.625rem;
  height: 100%;
  overflow: hidden;
`;

function RecommendedContents({ history }) {
  const showContentHandler = id => {
    history.push(`/content/${id}`);
  };

  return (
    <div>
      {thumbnail.map((i, k) => (
        <ThumbnailContainer key={k} onClick={() => showContentHandler(k)}>
          <ThumbnailTitle>{i.title}</ThumbnailTitle>
          <ThumbnailImg src={i.src} />
        </ThumbnailContainer>
      ))}
    </div>
  );
}

export default RecommendedContents;
