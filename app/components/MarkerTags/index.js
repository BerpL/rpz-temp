/**
 *
 * MarkerTags
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { rgba } from 'polished';

const Marker = styled.div.attrs(({ top, left }) => ({
  style: {
    transform: `translate(${left}px, ${top}px)`,
  },
}))`
  position: absolute;
  transform-origin: left top;
  z-index: 10;
  background: transparent;
  border: 5px solid ${({ theme }) => theme.colors.primary};
  width: 50px;
  height: 50px;
`;

// const AddMarkerForm = styled.div.attrs(({ x, y, zoom, display }) => ({
//   style: {
//     transform: `translate3D(${x}px, ${y}px, 0) scale(${zoom})`,
//   },
// }))`
//   position: absolute;
//   transform-origin: left top;
//   z-index: 20;
//   justify-content: center;
//   align-items: center;
//   padding: 5px 10px;
//   overflow: hidden;
//   white-space: nowrap;
//   height: 25px;
//   text-overflow: ellipsis;
//   border: 1px solid #ccc;
//   box-shadow: 0px 1px 1px #ddd, 0 2px 5px #ccc;
//   border-radius: 4px;
//   display: none;
//   background: ${({ theme }) => theme.colors.base};
//   &:hover {
//     display: ${({ isMoveMarker }) => !isMoveMarker && 'flex'};
//   }
// `;

function MarkerTags({ marker, zoom, isMoveMarker, onMouseDown }) {
  const handleOnMouseDown = e => {
    onMouseDown(e, marker.idDetalleEtiquetaModulo);
  };

  return (
    <Marker
      // style={{ ...marker }}
      top={marker.arriba}
      left={marker.izquierda}
      onMouseDown={handleOnMouseDown}

      // onClick={() => onClick(marker.key)}
    >
      {/* <AddMarkerForm
        isMoveMarker={isMoveMarker}
        x={45}
        y={(1 / zoom) * -30 - 5}
        zoom={1 / zoom}
        // style={{
        //   ,
        //   height: 25,
        //   transform: `translate3D(${45}px, ${(1 / zoom) * -30 -
        //     5}px, 0) scale(${1 / zoom})`,
        // }}
      >
        A AYHU76-89
      </AddMarkerForm> */}
    </Marker>
  );
}

MarkerTags.propTypes = {};

export default MarkerTags;
