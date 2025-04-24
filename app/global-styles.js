import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  *{
    box-sizing: border-box;
  }

  html,
  body {
    min-height: 100vh;
    width: 100%;
    display: flex;
    overflow-y: initial !important;
    flex-direction: column;
  }

  html{
    height: -webkit-fill-available;
  }

  body {
    min-height: -webkit-fill-available;
    font-family: 'Noto Sans HK', sans-serif;
  }

  body.fontLoaded, button {
    font-family: 'Noto Sans HK', sans-serif;
  }

  #app {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }


`;

export default GlobalStyle;
