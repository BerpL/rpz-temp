import styled from 'styled-components';
import { ContainerFlex as CF } from 'components/ContainerFlex';
import { darken, rgba, lighten } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  /* background: linear-gradient(to bottom,rgba(0,39,118,1) 0,rgba(0,21,68,1) 100%); */
  background: #fff;
  main {
    width: 100%;
    height: 100%;
  }

  iframe {
    width: 100%;
    height: 100%;
  }
  @media only screen and (max-width: 700px) {
    background: #c4c4c4;
    main {
      height: 95%;
    }
  }

  @media only screen and (max-width: 400px) {
    
    main {
      width: 100%;
      height: 91.5%;
    }

    iframe {
      width: 100%;
      height: 100%;
    }
  }
`;

const ContainerFlex = styled(CF)`
  background: ${({ theme }) => theme.colors.darkBase};
  min-height: 100vh;
  display: block;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 25px;
  line-height: 34px;
`;

const BeforeTitle = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  opacity: 0.5;
  line-height: 25px;
`;
const ContainerLoader = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

const PanZoom = styled.div`
  position: relative;
  flex: 1;
  user-select: none;
  overflow: hidden;
  width: 100%;
  height: ${({height}) => height};
  background: rgba(0, 0, 0);
`;

const Action = styled.div`
  padding: 10px;
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};
  background: ${({ theme, active }) =>
    darken(active ? '0.2' : '0', theme.colors.darkPrimary)};
  margin-right: 5px;
  transition: all 0.3s;
  &:hover {
    background: ${({ theme }) => darken('0.2', theme.colors.darkPrimary)};
  }
`;

const ContainerActions = styled.div`
  width: 90px;
  height: 40px;
  overflow: hidden;
  position: absolute;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 10px;
`;

const Iframe = styled.iframe`
  position: relative;
  transform-origin: left top;
`;

const OverlayIframe = styled.div`
  width: 2800px;
  height: 1400px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const PanZoomInner = styled.div.attrs(({ transform, styleInnerContainer }) => ({
  style: {
    transform,
    ...styleInnerContainer,
  },
}))`
  position: relative;
  transform-origin: left top;
`;


export const FlowDiagramContainer = styled.div`
  position: relative;
  width: calc(100%);


  /* @media only screen and (min-width: 1024px) {
    width: calc(100% - 300px);
  } */


`

export const MediaContainer = styled.div`
  width: 300px;
  height: 100vh !important;
  background: #fff;
  color: ghostwhite;
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? '0' : '-300px')}; 
  z-index: 1000;
  overflow: hidden;
  transition: right 0.3s ease; /* Aplica la transición a la propiedad right */

  @media only screen and (min-width: 1024px) {
    height: 600px;
    flex-basis: 300px;
  }
`;

const Resizer = styled.div`
  width: 10px; /* Aumenta el ancho para facilitar la interacción */
  height: 100%;
  cursor: ew-resize;
  position: absolute;
  left: -5px
  top: 0;
  z-index: 1001;
  background-color: rgba(0, 0, 0, 0.1); /* Color opcional para resaltar */
  &:hover {
    background-color: rgba(0, 0, 0, 0.2); /* Cambio visual al pasar el mouse */
  }
`;

export const MediaContent = styled.div`
  width: 100%;
  overflow: auto;
  height: calc(100% - 121px);
  padding: 10px;

  /* @media only screen and (min-width: 1024px) {

    height: calc(600px - 121px);
  } */
`

export const Wrapper = styled.div`
  display: flex;
  /* margin-top: 10px; */
  position: inherit;
  background: black;
  @media only screen and (min-width: 1024px) {
    position: relative;
    margin-left: 0px;
    width: 100%;
  }
`


export const IconMediaBar = styled.div`
  display: flex;
  padding: 0 16px;
  margin-top: 10px;
  padding-bottom: 10px;
  justify-content: center;

  border-bottom: 1px solid ${({ theme }) => rgba(theme.colors.white, 0.1)};
`;


export const TitleBar = styled.div`
  display: flex;
  padding: 0 16px;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background: #fff;
  margin-top: 2rem;
  border-radius: 15px;
  border: 2px solid #002776;
  color: #002776;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: #002776;
    color: #fff;
  }
`;


export const IconMedia = styled.div`
  color: ${({ theme }) => theme.colors.white};
  width: 50px;
  height: 50px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => rgba(theme.colors.black, 0.2)};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => rgba(theme.colors.black, 0.3)};
  }
`;


export const Fila = styled.div`
  padding: 10px 16px;
  display: flex;
  color: wheat;
  width: 100%;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  .balance_title {
    display: flex;
    flex: 1;
  }
  .balance_data{
    flex-shrink: 0 ;
    flex-basis: 100px;
    display: flex;
   justify-content: flex-end;
  }
`;


export const CloseIcon = styled.div`
  color: black;
  padding: 20px;
  display: flex;
  justify-content: flex-end;

  svg {
    width: 16px;
    height: 16px;
  }


  @media only screen and (min-width: 1024px) {
   display: none;
  }

`

export const GoBack = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index:1;
`

export {
  ContainerFlex,
  Title,
  BeforeTitle,
  ContainerLoader,
  OverlayIframe,
  PanZoom,
  PanZoomInner,
  Action,
  Iframe,
  ContainerActions,
  Resizer
};
