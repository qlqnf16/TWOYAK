import React from "react";
import styled from "styled-components";

import AboutUsImg from "../assets/images/about-us.png";

const AboutUsImgContainer = styled.img`
  margin-top: 4.375rem;
  width: 100%;
`;

function AboutUs() {
  return (
    <div>
      <AboutUsImgContainer src={AboutUsImg} alt="기업소개" />
    </div>
  );
}

export default AboutUs;
