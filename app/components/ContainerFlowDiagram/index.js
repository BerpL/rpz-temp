import React, { useRef } from 'react';
import styled from 'styled-components';
import usePanZoom from 'hooks/usePanZoom';

const Container = styled.div`
  display: flex;
  background: #101010;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const WidgetZoom = styled.div`
  position: absolute;
  width: 29px;
  bottom: 33px;
  z-index: 1;
  right: 20px;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  height: 57px;
  display: block;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
`;

const WidgetZoomIn = styled.div`
  background-color: #101010;
  border-radius: 2px;
  display: block;
  height: 29px;
  left: 0px;
  overflow: hidden;
  position: absolute;
  cursor: pointer;
  width: 29px;
  z-index: 2;
  box-sizing: border-box;
  transition: background-color 0.16s ease-out;
  top: 0px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;

const WidgetZoomOut = styled.div`
  background-color: #101010;
  border-radius: 2px;
  display: block;
  height: 29px;
  left: 0px;
  overflow: hidden;
  position: absolute;
  cursor: pointer;
  width: 29px;
  z-index: 2;
  box-sizing: border-box;
  transition: background-color 0.16s ease-out;
  bottom: 0px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;

const WidgetZoomDividier = styled.div`
  background-color: rgb(90%, 90%, 90%);
  height: 1px;
  left: 5px;
  position: absolute;
  top: 28px;
  width: 19px;
  z-index: 3;
  transition: background-color 0.16s ease-out;
  @media only screen and (min-width: 576px) {
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  overflow: hidden;
`;

const PanZoom = styled.div`
  position: relative;
  flex: 1;
  user-select: none;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const PanZoomInner = styled.div`
  position: relative;
  transform-origin: left top;
`;

const Iframe = styled.iframe`
  position: relative;
  transform-origin: left top;
`;

const propTypes = {};

const defaultProps = {};

const ContainerFlowDiagram = () => {
  const panZoomContainer = useRef(null);
  const imgRef = useRef(null);

  const {
    transform,
    zoom,
    onDragStart,
    styleInnerContainer,
    onLoadImage,
    panZoomHandlers,
  } = usePanZoom({
    container: panZoomContainer,
    imageContainer: imgRef,
    isImage: false,
  });

  return (
    <Container>
      <PanZoom ref={panZoomContainer} {...panZoomHandlers}>
        <PanZoomInner style={{ transform, ...styleInnerContainer }}>
          <div
            ref={imgRef}
            style={{ width: '1400px', height: '750px', position: 'relative' }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                position: 'absolute',
                width: '1400px',
                height: '750px',
              }}
            />
            <Iframe
              id="frame"
              src="http://www.tecsup-aqp.edu.pe/pgc4/public/diagramas/01/index.html"
              border="0"
              scrolling="no"
              width="1400px"
              height="750px"
            />
          </div>
        </PanZoomInner>
      </PanZoom>
    </Container>
  );
};

ContainerFlowDiagram.propTypes = propTypes;
ContainerFlowDiagram.defaultProps = defaultProps;

export default ContainerFlowDiagram;
