import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useLocation } from 'react-router-dom';  // Importa useLocation
import history from 'utils/history';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ThemeProvider } from 'styled-components';
import { lighten, darken } from 'polished';
import ReactNotification from 'react-notifications-component';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Asegúrate de que esta ruta es correcta
import logo from 'images/tecsup.png';

import 'sanitize.css/sanitize.css';
import './App.scss';
import 'react-notifications-component/dist/theme.css';

import bannerImage from './containers/Login/bg.jpg';
import App from 'containers/App';

const MOUNT_NODE = document.getElementById('app');

const theme = {
  colors: {
    text: 'rgb(0,0,0)',
    base: '#fff',
    primary: '#384E77',
    transparent: 'transparent',
    secondary: '#f2f2f2',
    textDark: '#63636e',
    darkBase: `#fff
  `,
    darkPrimary: '#0093E9',
    white: '#fff',
    black: '#000',
  },
  admin: {
    headerSize: '48px',
    sidebarSize: '300px',
    colors: {
      primary: '#6a197d',
      primaryLight: lighten(0.1, '#6a197d'),
      text: '#5f5f5f',
      textLight: lighten(0.25, '#5f5f5f'),
      textDark: darken(0.25, '#5f5f5f'),
      sideBar: 'rgb(247, 246, 243)',
    },
  },

  salmon: '#E8B082',
  bgU: '#2c2c2c',
  bgA: '#f2f2f2',
  primary: '#384E77',
  primaryLight: '#384E77',
  secondary: '#f2f2f2',
  indianRed: '#C26371',
  textBold: '#000000',
  textSubtitle: '#5B5B68',
  text: '#808B93',
  txt: 'red',
  red: '#041126',
  btnSecondary: '#dddddd',
  textMenu: '#BDBDCC',
  base: '#ffffff',
  error: '#FF0000',
  pdf: '#C42027',
  word: '#295495',
  sc: '#1BB53F',
};

const nextTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      primaryLight: '#347ff6',
      primaryLightHover: '#5E1DAD',
      primaryLightActive: '#ffffff',
      primaryLightContrast: '#ffffff',
      primary: '#FE0000',
      primaryBorder: '#FE0000',
      primaryBorderHover: '#347ff6',
      primarySolidHover: '#ffffff',
      primarySolidContrast: '#ffffff',
      primaryShadow: '#031795',
      gradient: 'linear-gradient(112deg, #031795 -25%, #FE0000 -10%, #347ff6 80%)',
      link: '#5E1DAD',
      myColor: '#ff4ecd',
      secondaryLight: '#abc5f7',
      secondaryLightHover: '#5E1DAD',
      secondaryLightActive: '#FE0000',
      secondaryLightContrast: '#002776',
      secondary: '#002776', // Color secundario referenciado
      secondaryBorder: '#FE0000',
      secondaryBorderHover: '#347ff6',
      secondarySolidHover: '#ffffff',
      secondarySolidContrast: '#ffffff',
      secondaryShadow: '#031795',
      navbarTextColor: '#ffffff'
    },
    space: {},
    fonts: {}
  }
});

const BrandContainer = () => {
  const location = useLocation();  // Usa useLocation para obtener la ruta actual

  // Verifica si la ruta es "/evaluation/:id" (donde :id es un número)
  const isEvaluationRoute = /^\/evaluation\/\d+/.test(location.pathname);

  if (isEvaluationRoute) {
    return null;  // No renderiza el div si coincide con la ruta
  }

  return (
    <div className="brand-container">
      <img src={logo} alt="Marca Tecsup" className="brand-image" />
    </div>
  );
};


const render = () => {
  ReactDOM.render(
    <>
      <NextUIProvider theme={nextTheme}>
        <I18nextProvider i18n={i18n}>
          <ReactNotification />
          <DragDropContextProvider backend={HTML5Backend}>
            <Router basename="/roshpinahzinc" history={history}>
              <ThemeProvider theme={theme}>
                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <App />
                  <BrandContainer />  {/* Agregamos el BrandContainer aquí */}
                </div>
              </ThemeProvider>
            </Router>
          </DragDropContextProvider>
        </I18nextProvider>
      </NextUIProvider>
    </>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
