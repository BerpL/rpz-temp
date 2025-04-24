import styled from 'styled-components';
import { darken } from 'polished';

const Viewer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
`;

const ButtonToolbar = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  text-align: center;
  position: relative;
  width: 100%;
  height: 100%;
`;

const PdfViewer = styled.div`
  width: auto;
  margin: auto;
  .page {
    margin: 0 auto !important;
    border: 0 !important;
    margin-bottom: 10px !important;
  }
`;

const ToolBarContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 82px;
  width: auto;
  height: 50px;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  display: flex;
  padding: 5px 10px;
  z-index: 10;
  & > .ZoomIn,
  & > .ZoomOut,
  & > .FitHeight,
  & > .FitWidth {
    border: 0;
    border-radius: 0;
    color: #fff;
    background: rgb(0,39,118);
    font-size: 16px;
    border-radius: 4px;
    font-weight: bold;
    margin: 2px;
    padding: 2px 7px;
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => darken('0.08', 'rgb(0,39,118)')};
    }
  }

  & > .ZoomPercent {
    text-align: center;
    font-size: 16px;
    color: transparent;
    margin: 2px;
  }
`;

const PdfBody = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export {
  PdfViewer,
  Viewer,
  PdfBody,
  Container,
  ToolBarContainer,
  ButtonToolbar,
};
