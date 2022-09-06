import styled from "styled-components";
import vars from "../../styles/Vars";

export const DropdownWrapper = styled.div`
  display: flex;
  margin-left: auto;
  white-space: nowrap;
`;

export const DropdownButton = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  margin: 0 24px 0 0;
  &:hover {
    cursor: pointer;
  }

  img {
    transition: all 0.1s ease-in-out;
  }

  .rotate {
    transform: rotateZ(180deg);
  }
`;

export const ImageWrapper = styled.div`
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  img {
    border-radius: 50%;
    overflow: hidden;
  }
`;

export const DropdownText = styled.div`
  padding: 0 8px;
  font-size: 14px;
  line-height: 20px;
  @media (max-width: ${vars.media.smMax}) {
    display: none;
  }
`;

export const DropdownList = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  bottom: -40px;
  right: 24px;
  padding: 12px 8px 12px 4px;
  background-color: ${vars.colors.primary.white};
  min-width: 150px;
  border: 1px solid ${vars.colors.primary.rainy};
  box-shadow: 0px 4px 8px rgba(30, 35, 40, 0.1);
  border-radius: 6px;
  z-index: 100;
`;

export const DropdownItem = styled.div`
  border-radius: 8px;
  padding: 4px 8px;
  font-size: 14px;
  line-height: 20px;
  &:hover {
    background-color: ${vars.colors.primary.cloudy};
    cursor: pointer;
  }
`;
