import React from "react";
import { BasicText, Line, FlexDiv } from "../UI/SharedStyles";
import styled from "styled-components";
import { ReactComponent as MedIcon } from "../../assets/images/med-icon.svg";

const Container = styled.div`
  margin: 1rem 0;
`;

const Icon = styled(MedIcon)`
  display: block;
  margin-right: 0.6rem;
  margin-top: 0.3rem;
`;

const BlockText = styled(BasicText)`
  display: block;
`;

const InteractionNotice = ({ durName, durText, durDetail }) => {
  return (
    <Container>
      <FlexDiv align="flex-start">
        <Icon />
        <BlockText>{durText}</BlockText>
      </FlexDiv>
      <Line />
      <div>
        {durDetail.map(list => {
          const drugs = list.name.split(" + ");
          return (
            <>
              <BlockText size="0.75rem" opacity="0.7">
                {drugs[0].split("(")[0]} + {drugs[1].split("(")[0]}
              </BlockText>
              <BlockText size="0.75rem" opacity="0.5">
                {durName === "interactions" && `: ${list.description}`}
              </BlockText>
            </>
          );
        })}
      </div>
    </Container>
  );
};

export default InteractionNotice;
