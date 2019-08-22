import React from "react";
import styled from "styled-components";

import { Divider } from "../../components/UI/SharedStyles";

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
`;

function HomeFooter(props) {
  return (
    <HomeFooterContainer>
      <Divider />
      <ItemWrapper>
        <EachItem onClick={() => props.history.push("/about-us")}>
          <strong>회사소개</strong>
        </EachItem>
        <EachItem>© 2019 by JDJ Inc. Proudly caring your health</EachItem>
      </ItemWrapper>
    </HomeFooterContainer>
  );
}

export default HomeFooter;
