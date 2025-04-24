/**
 *
 * FlowDiagram
 *
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaHandPointer, FaHandRock } from 'react-icons/fa/index.esm';
// import styled from 'styled-components';
import { hostUrlBase } from 'services/Api';
import usePanZoom from 'hooks/usePanZoom';
import {
  PanZoom,
  Iframe,
  PanZoomInner,
  OverlayIframe,
  ContainerActions,
  Action,
} from './Styles';

function PanLayer({ flowDiagram, height = '600px' }) {
  const [state, setState] = useState({
    isEnablePan: false,
    isEnableZoom: false,
  });

  const panZoomContainer = useRef(null);
  const containerRef = useRef(null);

  const { transform, panZoomHandlers } = usePanZoom({
    container: panZoomContainer,
    imageContainer: containerRef,
    enablePan: state.isEnablePan,
    enableZoom: state.isEnableZoom,
    initialZoom: 1,
    isImage: false,
    // onPan: () => closeAllMarkers(),
  });

  const enablePanFunc = () => {
    setState({
      isEnablePan: true,
      isEnableZoom: true,
    });
  };

  const disablePanFun = () => {
    setState({
      isEnablePan: false,
      isEnableZoom: false,
    });
  };

  return (
    <>
      <PanZoom ref={panZoomContainer} {...panZoomHandlers} height={height}>
        <PanZoomInner transform={transform}>
          <OverlayIframe
            style={{ display: state.isEnablePan ? 'block' : 'none' }}
          />
          <Iframe
            ref={containerRef}
            src={`${hostUrlBase}/${flowDiagram.url}/index.html`}
            // src="http://localhost:8080"
            frameBorder="0"
            width="2800px"
            height="1400px"
          />
        </PanZoomInner>
      </PanZoom>
      <ContainerActions>
        <Action active={state.isEnablePan} onClick={enablePanFunc}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8h32v96H128V192c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V288h96v96H192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8H288V288h96v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6v32H288V128h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64z"/></svg>
        </Action>
        <Action active={!state.isEnablePan} onClick={disablePanFun}>
          <FaHandPointer />
        </Action>
      </ContainerActions>
    </>
  );
}

PanLayer.propTypes = {
  flowDiagram: PropTypes.object.isRequired,
};

export default PanLayer;
