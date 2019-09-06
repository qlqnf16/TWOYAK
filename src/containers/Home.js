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
import "@fortawesome/fontawesome-free/css/all.css";
import HMACGenerator from "../components/RecommendSupplementProducts/HMACGenerator";

const HomeContainer = styled.div`
  width: 88%;
  max-width: 500px;
  margin: 90px auto 80px auto;
  padding-left: 0.5625rem;
  padding-right: 0.5625rem;
  color: var(--twoyak-black);
`;

const Camera = styled.div`
  position: fixed;
  bottom: 4rem;
  left: 1.4375rem;
  z-index: 300;
  padding: 10px;
  border-radius: 50%;
  background-color: var(--twoyak-blue);
`;

function Home(props) {
  const [currentDrugs, setCurrentDrugs] = useState(null);
  const [tokenChange, setTokenChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const { state: authState, dispatch } = useContext(AuthContext);

  useEffect(() => {
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
          if (response.data.data.length > 0) {
            setCurrentDrugs(response.data.data.splice(0, 4));
          }
          setLoading(false);
        })
        .catch(async error => {
          if (error.response.data.errors[0]) {
            await dispatch({
              type: "SIGNOUT"
            });
            alert(
              error.response.data.errors[0] === "Not Authenticated"
                ? "회원정보가 수정되었습니다."
                : null
            );
            setTokenChange(true);
            setLoading(false);
          }
        });
    }
  }, [authState.subUserId, authState.token, dispatch]);
  return (
    <HomeContainer>
      {/* <HMACGenerator
        method="POST"
        url={
          "https://www.coupang.com/vp/products/394035?itemId=1016006&vendorItemId=3156519262&sourceType=CATEGORY&categoryId=310533&isAddedCart="
        }
      /> */}
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
