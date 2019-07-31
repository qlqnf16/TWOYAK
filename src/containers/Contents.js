import React from "react";
import styled from "styled-components";
import { thumbnail } from "../components/Home/ContentDummy";
import ReactHtmlParser from "react-html-parser";
import close from "../assets/images/erase.svg";

const ContentContiner = styled.div`
  width: 100%;
  padding: 20px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: white;
  padding: 0;
  overflow: auto;
  display: flex;
  justify-content: center;
`;

const ContentGrid = styled.div`
  max-width: 720px;
`;

const CloseImg = styled.img`
  margin-top: 0.9375rem;
  margin-left: 0.9375rem;
`;

const ContentTitle = styled.div`
  font-size: 1.12rem;
  font-weight: 800;
  margin-top: 1.625rem;
  margin-right: 1rem;
  margin-left: 1rem;
`;

const ContentImg = styled.img`
  width: 100%;
  margin-top: 1.625rem;
`;

const ContentParagraph = styled.div`
  margin-top: 2.125rem;
  margin-right: 1rem;
  margin-left: 1rem;
  margin-bottom: 2rem;
  text-align: left;
`;

function Content(props) {
  console.log(props);
  return (
    <ContentContiner>
      <ContentGrid>
        <CloseImg src={close} onClick={() => props.history.goBack()} />
        <ContentTitle>{thumbnail[props.match.params.id].title}</ContentTitle>
        <ContentImg
          src={thumbnail[props.match.params.id].src}
          alt={`content${props.match.params.id}`}
        />
        <ContentParagraph>
          {ReactHtmlParser(thumbnail[props.match.params.id].paragraph)}
        </ContentParagraph>
      </ContentGrid>
    </ContentContiner>
  );
}

export default Content;
