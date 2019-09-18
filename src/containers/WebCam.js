import React, { Component } from "react";
import styled from "styled-components";
import WebCam from "react-webcam";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

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
    imgSrc: null,
    crop: {
      unit: "%",
      width: 30
    }
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

  handleImageLoaded = image => {
    this.imageRef = image;
  };

  handleOnCrop = crop => {
    this.setState({ crop });
  };

  handleOnCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.webp"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error("canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/webp");
    });
  }

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
          screenshotFormat="image/webp"
          videoConstraints={videoConstraints}
        />

        <button onClick={this.capture}>capture</button>
        <ReactCrop
          src={this.state.imgSrc}
          crop={this.state.crop}
          onImageLoaded={this.handleImageLoaded}
          onComplete={this.handleOnCropComplete}
          onChange={this.handleOnCrop}
        />
        {this.state.croppedImageUrl && (
          <img
            alt="cropped"
            style={{ maxWidth: "100%" }}
            src={this.state.croppedImageUrl}
          />
        )}
      </WebCamContainer>
    );
  }
}

export default WebCamCapture;
