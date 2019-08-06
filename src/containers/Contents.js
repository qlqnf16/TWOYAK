import React from "react";
import styled from "styled-components";
import { thumbnail } from "../components/Home/ContentDummy";
import ReactHtmlParser from "react-html-parser";
import close from "../assets/images/erase.svg";

const ContentContainer = styled.div`
  width: 100%;
  padding: 2rem;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: white;
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
`;

const ContentImg = styled.img`
  width: 100%;
  margin-top: 1.625rem;
`;

const ContentParagraph = styled.div`
  margin: 2.125rem 0 2rem 0;
  text-align: left;
  font-size: 0.9rem;
`;

function Content(props) {
  return (
    <ContentContainer>
      <ContentGrid>
        <CloseImg src={close} onClick={() => props.history.goBack()} />
        <ContentTitle>{thumbnail[props.match.params.id].title}</ContentTitle>
        <ContentParagraph>
          <img
            style="width: 100%"
            src="https://static.wixstatic.com/media/a27d24_cb4b83671b414977b9c1b80bb83b2dce~mv2.png/v1/fill/w_350,h_274,al_c,q_90,usm_0.66_1.00_0.01/a27d24_cb4b83671b414977b9c1b80bb83b2dce~mv2.webp"
            alt="content-img"
          />
          {/* {ReactHtmlParser(thumbnail[props.match.params.id].paragraph)} */}
        </ContentParagraph>
      </ContentGrid>
    </ContentContainer>
  );
}

export default Content;
