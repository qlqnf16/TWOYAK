import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthStore";
import styled from "styled-components";
import { breakpoints } from "../UI/SharedStyles";
import arrowIcon from "../../assets/images/search-arrow.svg";

import "@fortawesome/fontawesome-free/css/all.css";

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (min-width: ${breakpoints.medium}) {
    margin: 1rem;
  }
`;

const TopButtonLeftArea = styled.div`
  display: flex;
  width: 10rem;
  justify-content: space-between;
`;

const ActionButton = styled.div`
  width: auto;
  opacity: 0.6;
  font-size: 0.6875rem;
  color: #474747;
`;

function Topbar(props) {
  const { dispatch } = useContext(AuthContext);

  const goback = () => {
    props.history.goBack();
  };

  return (
    <Bar>
      <img src={arrowIcon} alt="arrow-icon" onClick={() => goback()} />
      <TopButtonLeftArea>
        <ActionButton
          onClick={() => {
            dispatch({
              type: "SIGNOUT"
            });
            props.history.push("/login");
          }}
        >
          로그아웃하기
        </ActionButton>
        <ActionButton onClick={() => props.history.push("/edit-info")}>
          내 정보 수정하기
        </ActionButton>
      </TopButtonLeftArea>
    </Bar>
  );
}

export default Topbar;
