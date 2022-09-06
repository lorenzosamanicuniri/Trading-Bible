import { css, createGlobalStyle } from "styled-components";
import vars from "./Vars";

const typography = css`
  body {
    font-size: ${vars.fonts.fontSize};
    font-family: ${vars.fonts.fontFamily};
    font-weight: ${vars.fonts.fontWeight};
    line-height: ${vars.fonts.lineHeight};
    color: ${vars.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a,
  button {
    transition: all 0.25s ease-in-out;
    cursor: pointer;
    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
      outline: none;
    }
    &:active {
      &:focus {
        outline: none;
      }
    }
    &[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }
  }
  a {
    color: ${vars.colors.text};
    &:hover,
    &:active,
    &:focus {
      color: darken(0.2, ${vars.colors.text});
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${vars.colors.text};
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 20px;
  }
  h1 {
    font-size: 36px;
    line-height: 1.22;
  }
  h2 {
    font-size: 32px;
    line-height: 1.25;
  }
  h3 {
    font-size: 24px;
    line-height: 1.33;
  }
  h4 {
    font-size: 20px;
    line-height: 1.4;
  }
  h5 {
    font-size: 14px;
    line-height: 1.42;
  }
  h6 {
    font-size: 12px;
    line-height: 1.33;
  }
  /* Aeonik */
  @font-face {
    font-family: "Aeonik";
    src: url("/fonts/Aeonik-Regular.woff2") format("woff2"),
      url("/fonts/Aeonik-Regular.woff") format("woff");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Aeonik";
    src: url("/fonts/Aeonik-Medium.woff2") format("woff2"),
      url("/fonts/Aeonik-Medium.woff") format("woff");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Aeonik";
    src: url("/fonts/Aeonik-Bold.woff2") format("woff2"),
      url("/fonts/Aeonik-Bold.woff") format("woff");
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
`;

export const Typography = createGlobalStyle`${typography}`;

export default typography;
