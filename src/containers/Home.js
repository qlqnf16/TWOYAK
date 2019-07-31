import React, { useEffect, useContext, useState } from "react";
import axios from "../apis";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthStore";

import CurrentDrugs from "../components/Home/CurrentDrugs";
import RecommendedContents from "../components/Home/RecommendedContents";
import medIcon from "../assets/images/med-icon.svg";
import Warning from "../components/UI/Warning";

const HomeContainer = styled.div`
  margin-top: 70px;
  padding-left: 1.375rem;
  padding-right: 1.375rem;
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
      <Header />
      {authState.token ? (
        <CurrentDrugs
          currentDrugs={currentDrugs ? currentDrugs : null}
          history={props.history}
          medIcon={medIcon}
          userName={authState.userName}
        />
      ) : null}

      <RecommendedContents history={props.history} />
      <Warning />
      <CurrentDrugs
        currentDrugs={currentDrugs ? currentDrugs.splice(0, 4) : null}
        history={props.history}
        medIcon={medIcon}
        userName={authState.userName}
      />
    </HomeContainer>
  );
}

export default Home;
