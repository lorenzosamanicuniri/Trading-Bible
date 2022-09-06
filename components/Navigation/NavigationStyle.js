import styled, { css } from "styled-components";
import vars from "../../styles/Vars";

export const NavigationWrapper = styled.div`
  position: fixed;
  height: 100%;
  left: 0;
  top: 0;
  transition: all 0.3s ease-in-out;
  width: ${(props) => (props.expanded ? "256px" : "68px")};
  background-color: white;
  z-index: 999;
  .tooltip {
    border-radius: 6px;
    margin-left: 20px;
    padding: 8px 4px;
    font-size: 12px;
    line-height: 16px;
    @media (max-width: ${vars.media.smMax}) {
      display: none;
    }
  }
  @media (max-width: ${vars.media.smMax}) {
    top: 64px;
    width: 256px;
    left: ${(props) => (!props.expanded ? "0" : "-256px")};
  }
`;

export const NavigationHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => (props.expanded ? "24px" : "14px")};
  padding-top: 16px;
  margin-bottom: ${(props) => (props.expanded ? "24px" : "42px")};
  .close-panel {
    filter: invert(52%) sepia(6%) saturate(375%) hue-rotate(161deg)
      brightness(93%) contrast(89%);
  }
  @media (max-width: ${vars.media.smMax}) {
    padding: 24px;
    padding-top: 16px;
    margin-bottom: 24px;
  }
`;

export const NavigationHeader = styled.div`
  display: flex;
  align-items: center;
  min-width: 140px;
  ${(props) =>
    !props.expanded &&
    css`
      height: 0;
      width: 0;
      min-width: 0;
    `}
  @media(max-width: ${vars.media.smMax}) {
    ${(props) =>
      !props.expanded &&
      css`
        height: auto;
        width: auto;
      `}
  }
`;

export const ClosePanel = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  transition: all 0.25s ease-in-out;
  &:hover {
    background-color: ${(props) =>
      !props.expanded && vars.colors.primary.rainy};
    cursor: pointer;
  }
  @media (max-width: ${vars.media.smMax}) {
    display: none;
  }
`;

export const NavTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 8px;
  transition: all 0.3s ease-in-out;
  font-size: ${(props) => (props.expanded ? "20px" : "0")};
  @media (max-width: ${vars.media.smMax}) {
    font-size: 20px;
  }
`;

export const NavigationLinkWrapper = styled.div`
  padding: 0 12px;
`;

export const LinkWrapper = styled.div`
  margin-top: 4px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.active ? vars.colors.primary.skyBlue : vars.colors.primary.white};
  display: flex;
  align-items: center;
  overflow: hidden;

  img {
    filter: ${(props) =>
      props.active
        ? "invert(100%)"
        : "invert(52%) sepia(6%) saturate(375%) hue-rotate(161deg) brightness(93%) contrast(89%)"};
  }
  &:hover {
    background-color: ${(props) =>
      props.active ? vars.colors.primary.skyBlue : vars.colors.primary.cloudy};
    img {
      filter: ${(props) =>
        !props.active &&
        "invert(27%) sepia(5%) saturate(796%) hue-rotate(169deg) brightness(96%) contrast(89%)"};
    }
    cursor: pointer;
  }
`;

export const NavigationLink = styled.div`
  display: flex;
  align-items: center;
  min-width: 200px;
  width: 100%;
  padding: 12px 15px;
  p {
    margin: 0;
    font-size: 14px;
    line-height: 20px;
    color: ${(props) =>
      props.active ? vars.colors.primary.white : vars.colors.primary.storm};
    @media (max-width: ${vars.media.smMax}) {
      font-size: 14px;
    }
  }

  .chevron {
    margin-left: auto;
    ${(props) =>
      props.active &&
      css`
        filter: brightness(0) invert(1);
      `}
    ${(props) =>
      !props.expanded &&
      css`
        display: none;
      `}
  }

  .currencyIcon {
    margin-right: 12px;
    ${(props) =>
      props.active &&
      css`
        filter: brightness(0) invert(1);
      `}
    ${(props) =>
      !props.expanded &&
      css`
        margin-right: 0;
      `}
  }

  &:hover {
    p {
      color: ${(props) =>
        props.active
          ? vars.colors.primary.white
          : vars.colors.primary.offBlack};
    }
  }

  ${(props) =>
    !props.expanded &&
    css`
      min-width: unset;
      padding: 12px;
    `}
`;

export const ImageWrapper = styled.div`
  position: relative;
  height: 24px;
  width: 24px;
  display: inline-block;
  margin: ${(props) => (props.expanded ? "10px 12px" : "10px")};
`;

export const NavigationCta = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  line-height: 1.42;
  padding: 16px;
  background-color: #eef1f2;
  border: 0;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:focus,
  &:active {
    background-color: #c1c1c1;
  }

  img {
    margin-right: auto;
  }

  span {
    margin-right: auto;
    padding-left: 12px;
    transition: all 0.3s ease-in-out;
  }

  @media (max-width: ${vars.media.smMax}) {
  }

  ${(props) =>
    !props.expanded &&
    css`
      width: auto;
      span {
        font-size: 0;
        padding-left: 0;
      }
    `}
`;

export const SubLinkWrapper = styled(LinkWrapper)`
  margin-left: 36px;
  min-width: unset;
  color: ${(props) =>
    props.active ? vars.colors.primary.white : vars.colors.primary.offBlack};
  background-color: ${(props) =>
    props.active ? vars.colors.primary.skyBlue : vars.colors.primary.white};
`;

export const NavigationSubLink = styled(NavigationLink)`
  font-size: 14px;
`;
