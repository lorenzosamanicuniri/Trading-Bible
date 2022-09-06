import styled, { css } from "styled-components";

export const CardWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
  padding: 18px 40px;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: all 0.15s ease, border-color 0.15s ease;
  width: 100%;
  cursor: pointer;
  background-color: white;
  .user {
    width: 100%;
    display: flex;
    margin-top: auto;
    font-size: 16px;
    font-weight: 500;
  }
  .id {
    font-size: 12px;
    font-weight: 800;
  }
  .created {
    font-size: 12px;
    font-weight: 800;
  }

  &:hover,
  &:focus,
  &:active {
    border-color: #1a1a1a;
  }
`;

export const CardDate = styled.span`
  font-size: 14px;
  line-height: 1.42;
`;

export const CardValue = styled.span`
  display: flex;
  font-size: 18px;
  line-height: 1.11;
  font-weight: 700;
  ${(props) =>
    props.bold &&
    css`
      color: #1e87ff;
      font-size: 26px;
    `}
`;

export const CardCtaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CardCtaButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 1.33;
  padding: 4px 8px;
  background-color: #eef1f2;
  border: 0;
  border-radius: 6px;
  margin-bottom: 30px;
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
      margin-bottom: 0;
      &:hover,
      &:focus,
      &:active {
        background-color: #ae252e;
      }
    `}
`;
