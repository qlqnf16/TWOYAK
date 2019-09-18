import React from "react";
import styled from "styled-components";

const HomeFooterContainer = styled.div`
  margin-top: 2.125rem;
`;

const ItemWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const EachItem = styled.div`
  font-size: 0.75rem;
  text-align: right;
`;

const Copyright = styled.div`
  text-align: right;
  font-size: 0.75rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  opacity: 0.5;
  background-color: var(--twoyak-blue);
`;

function HomeFooter(props) {
  return (
    <HomeFooterContainer>
      <Divider />
      <ItemWrapper>
        <EachItem onClick={() => props.history.push("/about-us")}>
          <strong>회사소개</strong>
        </EachItem>
      </ItemWrapper>
      <Copyright>© 2019 by JDJ Inc. Proudly caring for your health</Copyright>
    </HomeFooterContainer>
  );
}

export default HomeFooter;
