import styled, { css } from "styled-components";
import {
  ModalForm,
  ModalInput,
  ModalInputLabel,
} from "../components/AddModal/AddModalStyle";
import SimpleBarChart from "../components/BarChart/BarChart";
import vars from "./Vars";

export const Main = styled.section`
  min-height: 100vh;
  padding: 104px 60px 0 60px;
  margin-left: 68px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #eef1f2;
  transition: margin 0.3s ease-in-out;
  ${(props) =>
    props.expanded &&
    css`
      margin-left: 256px;
    `}
`;

export const LogoWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  z-index: 1;
  display: flex;
  align-items: center;

  h4 {
    color: white;
    margin: 4px 0 0 8px;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

export const ActiveEventTitle = styled.h1`
  margin-bottom: 0;
`;

export const AddExampleCta = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1.42;
  padding: 12px 17px;
  color: white;
  background-color: #1e87ff;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  width: 100%;
  max-width: 200px;

  &:hover,
  &:focus,
  &:active {
    background: #1e78df;
  }

  img {
    margin-right: auto;
    filter: invert(1) brightness(1);
  }

  span {
    margin-right: auto;
    padding-left: 12px;
    transition: all 0.3s ease-in-out;
  }

  @media (max-width: ${vars.media.smMax}) {
  }
`;

export const TableView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 200px);
  overflow: auto;
`;

export const TableHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: white;
  background-color: #1e2328;
  border-radius: 8px;
  padding: 12px 40px;
  z-index: 9;
  span {
    display: flex;
    font-size: 12px;
    line-height: 1.33;
    font-weight: 500;
  }

  .col-img {
    min-width: 200px;
  }
  .col-cta {
    min-width: 130px;
  }
`;

export const LayoutWrap = styled.section`
  position: relative;
  display: flex;
  min-height: 100vh;
  background-color: #464b50;
`;

export const Column = styled.div`
  position: relative;
  width: 100%;
  max-width: 60%;
  color: white;
  background-color: #464b50;
  z-index: 0;

  .bg-img {
    position: absolute;
    inset: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0 40px 40px 0;
    overflow: hidden;
    filter: blur(4px);
  }

  span {
    display: flex;
    margin-bottom: 12px;
    a {
      font-weight: 500;
      margin-left: 8px;
    }
  }

  .status {
    display: flex;
    margin-top: auto;
    font-size: 20px;
    line-height: 1.2;
    font-weight: 700;
  }

  @media (max-width: ${vars.media.smMax}) {
  }

  ${(props) =>
    props.leftCol &&
    css`
      display: flex;
      flex-direction: column;
      padding: 160px 100px 60px 100px;

      h1 {
        font-size: 80px;
        line-height: 1.2;
      }

      h2 {
        font-size: 50px;
        line-height: 1.2;
        margin-bottom: 12px;
      }

      @media (max-width: ${vars.media.smMax}) {
        display: none;
      }
    `}

  ${(props) =>
    props.rightCol &&
    css`
      height: 100%;
      overflow: auto;
      padding: 120px 75px;
      max-width: 40%;
      border-radius: 0;

      h1 {
        margin-bottom: 32px;
      }

      span {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
      }

      .mobile-bg-img {
        display: none;
        position: absolute;
        inset: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0 40px 40px 0;
        filter: blur(4px);
        overflow: hidden;
      }

      @media (max-width: ${vars.media.smMax}) {
        padding: 80px 40px;
        max-width: 100%;
        .mobile-bg-img {
          display: flex;
        }
      }
    `}
`;

export const SignUpForm = styled(ModalForm)`
  padding-top: 42px;

  .error {
    color: #fa5f69;
  }
`;

export const SignUpInputWrapper = styled.div`
  position: relative;
  .icon-email {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translate(0, -15px);
  }
  .icon-pass {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translate(0, -19px);
  }
  .icon-hide {
    position: absolute;
    right: 11px;
    top: 50%;
    transform: translate(0, -17px);
    cursor: pointer;
    transition: filter 0.25s ease-in-out;
    &:hover {
      filter: brightness(0);
    }
  }
  .icon-user {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translate(0, -18px);
    cursor: pointer;
    transition: filter 0.25s ease-in-out;
  }
`;

export const SignUpInput = styled(ModalInput)`
  padding: 11px 38px;
  width: 100%;
  &::placeholder {
    color: #a0a7ab;
  }
`;

export const SignUpInputLabel = styled(ModalInputLabel)`
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 6px;
`;

export const SignUpCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;

  label {
    margin-bottom: 0;
  }
`;

export const SignUpCheckbox = styled.input`
  height: 15px;
  width: 15px;
  margin-right: 10px;
`;

export const SignUpRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LoginCta = styled.button`
  margin-top: 60px;
  padding: 17px 0;
  color: white;
  background-color: #1e87ff;
  border-radius: 8px;
  border: 0;
  outline: 0;
  font-size: 17px;
  line-height: 1.18;
  font-weight: 500;
  box-shadow: 0px 4px 26px rgba(0, 0, 0, 0.25);

  &:hover,
  &:active,
  &:focus {
    background: #1e78df;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.2;
    background-color: #1e87ff !important;
  }
`;
