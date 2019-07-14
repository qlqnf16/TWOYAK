import React, { useContext } from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthStore";
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

const TopButtonLeftArea = styled.div`
  display: flex;
  width: 10rem;
  justify-content: space-between;
`

const ActionButton = styled.div`
  width: auto;
  opacity: 0.6;
  font-size: 0.6875rem;
  color: #474747;
`


function Topbar(props) {
  const { state: authState, dispatch } = useContext(AuthContext);
  
  const goback = () => {
    props.history.goBack();
  };

  return (
    <Bar>
      <ArrowIcon 
        className="fas fa-arrow-left" 
        onClick={() => 
          goback()
        }
      />
      <TopButtonLeftArea>
        <ActionButton
          onClick={() => 
            dispatch({
              type: "SIGNOUT"
            })
          }
        >
          로그아웃하기
        </ActionButton>
        <ActionButton>
          내 정보 수정하기
        </ActionButton>
      </TopButtonLeftArea>
      { !authState.token ? 
        <Redirect to="/login" /> :
        null
      }
    </Bar>
  )
};

export default Topbar;