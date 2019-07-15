import styled from "styled-components";

export const Close = styled.div`
  position: absolute;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
  z-index: 105;
  cursor: pointer;

  :hover {
    opacity: 1;
  }

  :before,
  :after {
    position: absolute;
    right: 15px;
    width: 2px;
    background-color: #333;
    height: 33px;
    content: "";
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
`;
