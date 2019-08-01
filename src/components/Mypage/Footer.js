import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: #ffffff;
  position: fixed;
  bottom: 1.4375rem;
  height: 76px;
  width: 50%;
  z-index: 200;
`;

const ItemWrapper = styled.div`
  height: 100%;
`;

const EachItem = styled.div`
  text-decoration: underline;
  text-underline-position: under;
  width: auto;
  padding: 4px;
  font-size: 14px;
`;

function Footer({ routes }) {
  return (
    <FooterContainer>
      <ItemWrapper>
        <EachItem onClick={() => routes.history.push("/terms/use")}>
          이용약관
        </EachItem>
        <EachItem onClick={() => routes.history.push("/terms/info")}>
          개인정보취급방침
        </EachItem>
      </ItemWrapper>
    </FooterContainer>
  );
}

export default Footer;
