import { createGlobalStyle } from 'styled-components';
import theme from 'theme';

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: ${theme.colors.text.primary};
    background: ${theme.colors.primary.dark};
  }

  #root {
    position: relative;
    min-height: 100vh;
  }
`;
