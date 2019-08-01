import React from "react";
import styled from "styled-components";
import screen from "../../assets/images/screen.png";
import icon from "../../assets/images/twoyak_logo.png";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(121deg, #00cfff, #00a2ff);
`;

const InnerContainer = styled.div`
  position: relative;
  max-width: 1080px;
  height: 100vh;
  margin: 0 auto;
`;

const ScreenImage = styled.img`
  width: 300px;
  position: absolute;
  left: 4rem;
  top: 50%;
  transform: translateY(-50%);
`;

const TextContainer = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  position: absolute;
  right: 4rem;
  top: 50%;
  transform: translateY(-50%);
  text-align: right;
`;

const Logo = styled.div`
  text-shadow: 2px 2px 6px rgba(16, 87, 177, 0.5);
  font-size: 3rem;
  font-weight: 800;
`;

const Slogan = styled.div`
  text-shadow: 2px 2px 6px rgba(16, 87, 177, 0.5);
  text-align: right;
  font-size: 1.27rem;
`;

const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin-bottom: 3rem;
`;

const Icon = styled.img`
  width: 7rem;
  margin-top: -1rem;
  margin-right: 1rem;
`;

const Block = () => (
  <Container>
    <InnerContainer>
      <ScreenImage src={screen} />
      <TextContainer>
        <Flex>
          <Icon src={icon} />
          <div>
            <Slogan>의약품 복용 이력과 안전 정보를 한눈에!</Slogan>
            <Logo>투약 (TWOYAK)</Logo>
          </div>
        </Flex>
        PC환경에서 더 나은 경험을 제공하기 위해 노력중입니다.
        <br />
        투약의 서비스 이용을 원하신다면 모바일로 접속해주세요!
      </TextContainer>
    </InnerContainer>
  </Container>
);

export default Block;
