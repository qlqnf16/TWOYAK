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

export const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const FlexForm = styled.form`
  display: flex;
  align-items: start;
  width: 100%;
`;

export const Card = styled.div`
  width: 88%;
  margin: 0 auto 2rem auto;
  background-color: white;
  border-radius: 13px;
  box-shadow: 1px 2px 7px 1px rgba(212, 212, 212, 0.5);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.875rem;
`;

export const BasicButton = styled.button`
  flex-grow: 0;
  border-radius: 1.5rem;
  background-color: #00a2ff;
  padding: 0.5rem 1.3rem;
  color: white;
  font-weight: 800;
  font-size: 0.93rem;
  border: none;
  margin: 0 auto;
`;

export const WhiteButton = styled(BasicButton)`
  color: var(--twoyak-blue);
  background-color: white;
  box-shadow: 1px 2px 7px 1px rgba(212, 212, 212, 0.5);
  display: block;
  font-weight: 1rem;
  margin: 1rem auto 1.25rem auto;
`;

export const Line = styled.div`
  margin: 0.8rem 0 1.3rem 0;
  height: 1px;
  opacity: 0.3;
  background-color: #00a2ff;
`;


export const BasicInput = styled.input`
  width: 20.1875rem;
  height: 3rem;
  border-radius: 1.5rem;
  border: solid 1px var(--twoyak-blue);
  padding-left: 1.0937rem; 
  padding-right: 1.0937rem;
`