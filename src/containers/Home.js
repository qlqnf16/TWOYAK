import React, { useEffect, useContext, useState } from "react";
import axios from "../apis";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthStore";

import CurrentDrugs from "../components/Home/CurrentDrugs";
import RecommendedContents from "../components/Home/RecommendedContents";
import medIcon from "../assets/images/med-icon.svg";
import Warning from "../components/UI/Warning";

const HomeContainer = styled.div`
  width: 88%;
  margin: 90px auto 50px auto;
  padding-left: 0.5625rem;
  padding-right: 0.5625rem;
  color: var(--twoyak-black);
`;

function Home(props) {
  const [currentDrugs, setCurrentDrugs] = useState(null);
  const { state: authState, dispatch } = useContext(AuthContext);

  useEffect(() => {
    dispatch({
      type: "SET_AUTH_REDIRECT_PATH",
      path: null
    });
    if (authState.subUserId) {
      axios({
        method: "GET",
        url: `/user/${authState.subUserId}/current_drugs`,
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      })
        .then(response => {
          if (response.data.length > 0) {
            setCurrentDrugs(response.data.splice(0, 4));
          }
        })
        .catch(error => console.log(error));
    }
  }, [authState.subUserId, authState.token]);

  return (
    <HomeContainer>
      <Warning />
      {authState.token ? (
        <CurrentDrugs
          currentDrugs={currentDrugs ? currentDrugs : null}
          history={props.history}
          medIcon={medIcon}
          userName={authState.userName}
        />
      ) : null}
      <RecommendedContents history={props.history} />
    </HomeContainer>
  );
}

export default Home;
