import styled, { css } from "styled-components";

export const TopBarWrapper = styled.div`
  position: fixed;
  left: 68px;
  top: 0;
  right: 0;
  background-color: white;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  transition: left 0.3s ease-in-out;
  z-index: 99;

  ${(props) =>
    props.expand &&
    css`
      left: 250px;
    `}
`;

export const SelectedPair = styled.span`
  font-size: 14px;
  line-height: 1.42;
  margin-left: 12px;
  margin-right: 20px;
  color: #787e82;
`;

export const CtaButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 1.33;
  padding: 4px 8px;
  background-color: #eef1f2;
  border: 0;
  border-radius: 6px;
  margin-right: 20px;
  &:hover,
  &:focus,
  &:active {
    background-color: #c1c1c1;
  }

  img {
    margin-right: 4px;
  }

  ${(props) =>
    props.btnDelete &&
    css`
      color: white;
      background-color: #fa5f69;
      margin-right: 0;
      &:hover,
      &:focus,
      &:active {
        background-color: #ae252e;
      }
    `}
`;
