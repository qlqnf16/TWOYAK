import styled from "styled-components";
import Rating from "react-rating";

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
  margin: 70px auto 120px auto;
  ${props => (props.preventScroll ? `position: fixed; overflow-y: hidden` : "")}

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
  align-items: ${props => (props.align ? props.align : "center")};
  justify-content: ${props => (props.justify ? props.justify : "flex-start")};
  flex-shrink: ${props => (props.shrink ? props.shrink : 1)};
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

export const EmptyCard = styled(Card)`
  background-color: transparent;
  border: 2px #c4c9cc dashed;
  align-items: center;
  box-shadow: none;
  padding: 4.875rem 0;
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
  cursor: pointer;
`;

export const WhiteButton = styled(BasicButton)`
  color: var(--twoyak-blue);
  background-color: white;
  box-shadow: 1px 2px 7px 1px rgba(212, 212, 212, 0.5);
  display: block;
  font-weight: 1rem;
  margin: 1rem auto 2rem auto;
  opacity: ${props => props.opacity && props.opacity};
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
`;

export const StyledRating = styled(Rating)`
  color: #d8d8d8;
  margin: 0 -6px;
  .custom {
    margin: 0 6px;
  }
  .full {
    color: var(--twoyak-blue);
  }
`;

export const BasicText = styled.div`
  display: inline;
  font-size: ${props => (props.size ? props.size : "0.875rem")};
  color: ${props => (props.color ? props.color : "#474747")};
  opacity: ${props => props.opacity};
  font-weight: ${props => (props.bold ? props.bold : "bold")};
`;

export const RatingText = styled(BasicText)`
  margin-left: ${props => (props.margin ? props.margin : "1rem")};
`;

export const BulletText = styled.li`
  color: var(--twoyak-blue);
  margin-left: 1.68rem;
  & p {
    color: var(--twoyak-black);
    display: inline;
    margin-left: -5px;
    font-size: 0.8rem;
    font-weight: 800;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  opacity: 0.5;
  background-color: var(--twoyak-blue);

export const AutosuggestStyleWrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  position: relative;
  width: 100%;
  margin: 1rem 0;
  border-radius: 1.5rem;
  border: solid 1px var(--twoyak-blue);

  & .react-autosuggest__container {
    height: 2rem;
    padding: 1rem;

    display: flex;
    align-items: center;
  }

  & .react-autosuggest__input {
    width: 100%;
    padding: 1rem;
    height: 2rem;
    background: transparent;
    border: none;
  }

  & .react-autosuggest__suggestions-container--open {
    width: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
    left: 0;
    top: 33px;
    background-color: white;
    border: 1px solid var(--twoyak-blue);
    z-index: 140;
  }

  & .react-autosuggest__suggestion {
    list-style-type: none;
    font-size: 0.7rem;
    margin-bottom: -1px;
    color: var(--twoyak-black);
    cursor: pointer;
    padding: 0.5rem;
    font-weight: bold;
  }
`;
