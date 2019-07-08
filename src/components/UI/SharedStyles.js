import styled from "styled-components";

export const breakpoints = {
  // Material design 기준
  small: "600px", //mobile
  medium: "960px", //tablet or small desktop
  large: "1280px", //desktop
  extraLarge: "1920px" //large desktop
};

export const Container = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5vh auto;

  @media (min-width: ${breakpoints.medium}) {
    margin: 25vh auto;
    width: 80%;
  }
  @media (min-width: ${breakpoints.large}) {
    width: 70%;
  }
  @media (min-width: ${breakpoints.extraLarge}) {
    width: 55%;
  }
`;

export const FlexForm = styled.form`
  display: flex;
  align-items: start;
  width: 100%;
`;

export const BasicButton = styled.button`
  padding: 2px 6px;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #2779a9;
  color: white;
  border: none;
  cursor: pointer;
`;
