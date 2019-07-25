import React from "react";
import styled from "styled-components";

const HeaderMessage = styled.div`
  opacity: 0.6;
  font-size: 0.625rem;
  color: #474747;
  padding-top: 1.3125rem;
`;

function Header() {
  return (
    <HeaderMessage>
      투약은 식약처 공공데이터를 이용하여 의약품 안전정보 등을 제공하고 있으며,
      이러한 정보는 단순 참조용으로 서비스 제공자는 어떠한 법적 책임을 지지
      않습니다.
    </HeaderMessage>
  );
}

export default Header;
