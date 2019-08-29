import React from "react";
import styled from "styled-components";

import aboutUsImg from "../assets/images/about-us.png";

const Container = styled.div`
  text-align: center;
`

const AboutUsImg = styled.img`
  margin-top: 4.375rem;
  width: 100%;
  max-width: 550px;
`;

function AboutUs() {
  return (
    <Container>
      <AboutUsImg src={aboutUsImg} alt="기업소개" />
    </Container>
  );
}

export default AboutUs;
