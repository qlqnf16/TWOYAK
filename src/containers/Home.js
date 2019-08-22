import React, { useEffect, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "../apis";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthStore";

import CurrentDrugs from "../components/Home/CurrentDrugs";
import RecommendedContents from "../components/Home/RecommendedContents";
import medIcon from "../assets/images/med-icon.svg";
import Warning from "../components/UI/Warning";
import Footer from "../components/Home/Footer";

const HomeContainer = styled.div`
  width: 88%;
  margin: 90px auto 50px auto;
  padding-left: 0.5625rem;
  padding-right: 0.5625rem;
  color: var(--twoyak-black);
`;

function Home(props) {
  const [currentDrugs, setCurrentDrugs] = useState(null);
  const [tokenChange, setTokenChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const { state: authState, dispatch } = useContext(AuthContext);

  useEffect(() => {
    dispatch({
      type: "SET_AUTH_REDIRECT_PATH",
      path: null
    });
    if (authState.subUserId) {
      setLoading(true);
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
          setLoading(false);
        })
        .catch(async error => {
          if (error.response.data.errors[0]) {
            await dispatch({
              type: "SIGNOUT"
            });
            alert(error.response.data.errors[0]);
            setTokenChange(true);
            setLoading(false);
          }
        });
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
          loading={loading}
        />
      ) : null}
      <RecommendedContents history={props.history} />
      <Footer history={props.history} />
      {tokenChange ? <Redirect to="/login" /> : null}
    </HomeContainer>
  );
}

export default Home;
