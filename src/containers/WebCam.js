import React, { Component } from "react";
import styled from "styled-components";
import WebCam from "react-webcam";

const WebCamContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: white;
  overflow: auto;
`;

class WebCamCapture extends Component {
  state = {
    imgSrc: ""
  };
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({
      imgSrc: imageSrc
    });
  };

  render() {
    const videoConstraints = {
      width: window.screen.height,
      height: window.screen.height,
      facingMode: "environment"
    };

    return (
      <WebCamContainer>
        <WebCam
          audio={false}
          width="100%"
          height={window.screen.height}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />

        <button onClick={this.capture}>capture</button>
        <img src={this.state.imgSrc} />
      </WebCamContainer>
    );
  }
}

export default WebCamCapture;
