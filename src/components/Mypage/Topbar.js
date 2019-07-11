import React from 'react';
import styled from 'styled-components';
import { breakpoints } from '../UI/SharedStyles';

import "@fortawesome/fontawesome-free/css/all.css";

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (min-width: ${breakpoints.medium}) {
    margin: 1rem;
  }
`

const ArrowIcon = styled.i`
  display: block;
  color: var(--twoyak-black);
  font-size: 1.5rem;
  margin-right: 10px;
`

const ReviseUserInfoButton = styled.div`
  width: auto;
  opacity: 0.6;
  font-size: 0.6875rem;
  color: #474747;
`

function Topbar() {
  return (
    <Bar>
      <ArrowIcon className="fas fa-arrow-left" />
      <ReviseUserInfoButton>
        내 정보 수정하기
      </ReviseUserInfoButton>
    </Bar>
  )
};

export default Topbar;