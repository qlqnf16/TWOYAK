import React from 'react';
import SearchInput from "./SearchInput";
import styled from 'styled-components';
import addIcon from "../../../assets/images/add.svg";

const StyleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 15.5rem;
`

function AppendResult({
  diseaseArray,
  appendDiseaseId,
}) {
  return (
    <StyleWrapper>
      <SearchInput
        diseaseArray={diseaseArray}
        appendDiseaseId={(suggestion) => 
          appendDiseaseId(suggestion)
        }
      />
      <img src={addIcon} />
    </StyleWrapper>
  )
};

export default AppendResult;

