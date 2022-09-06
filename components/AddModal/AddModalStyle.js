import styled, { css } from "styled-components";
import vars from "../../styles/Vars";

export const ModalWrapper = styled.div`
  position: fixed;
  inset: 25%;
  padding: 40px 100px 60px 100px;
  border-radius: 8px;
  background-color: #eef1f2;
  box-shadow: 0px 0px 0px 1000px rgba(0, 0, 0, 0.5);
  z-index: 99999;
  /* overflow: auto; */
  height: 100%;
  max-height: 400px;

  ${(props) =>
    props.exampleModal &&
    css`
      height: 100%;
      max-height: 585px;
    `}

  .hiddenFileInput {
    position: fixed;
    left: 10000px;
  }

  .placeholder {
    margin: 0 auto;
    cursor: pointer;
  }
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ModalFormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 -12px;
`;

export const ModalInputLabel = styled.label`
  font-size: 14px;
  line-height: 1.42;
  font-weight: 500;
`;

export const ModalInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0 12px;
  input {
    width: 100%;
  }

  ${(props) =>
    props.halfWidth &&
    css`
      width: 50%;
    `}
`;

export const ModalInput = styled.input`
  margin-top: 4px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: 0;
  transition: border 0.25s ease-in-out;
  padding: 8px 16px;
  outline: none;
  &:active,
  &:focus-visible {
    border: 1px solid rgba(#1a1a1a, 1);
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CtaWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 32px;
`;

export const AddEventCta = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  color: white;
  background: #1e87ff;
  border: 0;
  border-radius: 12px;
  transition: all 0.28s ease-in-out;
  cursor: pointer;
  width: fit-content;
  font-weight: 500;

  img {
    margin-right: 8px;
  }

  .color-invert {
    filter: invert(1) brightness(1);
  }

  &:hover,
  &:active,
  &:focus {
    background: #1e78df;
  }
`;

export const CancelCta = styled.button`
  background: none;
  border: 0;
  padding: 12px 16px;
  color: #a0a7ab;
  margin-right: 12px;
  &:hover,
  &:active,
  &:focus {
    color: #1e2328;
  }
`;
