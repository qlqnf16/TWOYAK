import React from "react";
import styled from "styled-components";
import TutorialGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import tutorial1 from "../assets/tutorialImage/tutorial1.jpg";
import tutorial2 from "../assets/tutorialImage/tutorial2.jpg";
import tutorial3 from "../assets/tutorialImage/tutorial3.jpg";
import tutorial4 from "../assets/tutorialImage/tutorial4.jpg";
import tutorial5 from "../assets/tutorialImage/tutorial5.jpg";
import step1 from "../assets/stepImage/step1.jpg";
import step2 from "../assets/stepImage/step2.jpg";
import step3 from "../assets/stepImage/step3.jpg";
import step4 from "../assets/stepImage/step4.jpg";

const TutorailContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: white;
  overflow: auto;
`;

const CloseButton = styled.div`
  width: 30px;
  height: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: transparent;
  color: var(--twoyak-blue);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;
  margin-left: 20px;
`;

const TutorialGalleryComponent = styled(TutorialGallery)`
  & .image-gallery-slide img {
    width: 100%;
    height: 100vh;
  }
`;

function ServiceTutorial(props) {
  const images = [
    {
      original: tutorial1
    },
    {
      original: tutorial2
    },
    {
      original: tutorial3
    },
    {
      original: tutorial4
    },
    {
      original: tutorial5
    },
    {
      original: step1
    },
    {
      original: step2
    },
    {
      original: step3
    },
    {
      original: step4
    }
  ];
  return (
    <TutorailContainer>
      <CloseButton onClick={() => props.history.push("/")}>SKIP</CloseButton>
      <TutorialGalleryComponent
        items={images}
        infinite={false}
        showThumbnails={false}
        showFullscreenButton={false}
        useBrowserFullscreen={false}
        showPlayButton={false}
      />
    </TutorailContainer>
  );
}

export default ServiceTutorial;
