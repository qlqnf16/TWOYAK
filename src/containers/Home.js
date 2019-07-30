import React, { useEffect, useContext, useState } from "react";
import axios from "../apis";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthStore";

import Header from "../components/Home/Header";
import CurrentDrugs from "../components/Home/CurrentDrugs";
import RecommendedContents from "../components/Home/RecommendedContents";
import medIcon from "../assets/images/med-icon.svg";

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
      <CurrentDrugs
        currentDrugs={currentDrugs ? currentDrugs : null}
        history={props.history}
        medIcon={medIcon}
        userName={authState.userName}
      />
      <RecommendedContents history={props.history} />
    </HomeContainer>
  );
}

export default Home;
