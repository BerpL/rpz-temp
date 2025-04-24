/**
 *
 * MarkerTags
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaLocationArrow } from 'react-icons/fa/index.esm';


// import { rgba } from 'polished';

const Marker = styled.div.attrs(({ top, left }) => ({
  style: {
    transform: `translate(${left}px, ${top}px) rotate(45deg)`,
  },
}))`
  position: absolute;
  transform-origin: left top;
  z-index: 10;
  border: 7px solid aqua;
  border-radius: 37px 37px 0px 37px;
  box-shadow: -1px 1px 25px aqua;
  cursor: pointer;
  width: 60px;
  height: 60px;
  transition: 0.3s;
    top: -20px;
    left: 27px;
  &:before {
    content: " ";
    position: absolute;
    z-index: -1;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border: 1px solid black;
    border-radius: 37px 37px 0px 37px;
  }
  &:after {
    content: " ";
    position: absolute;
    z-index: -1;
    top: -7px;
    left: -7px;
    right: -7px;
    bottom: -7px;
    border: 1px solid black;
    border-radius: 37px 37px 0px 37px;
  }
  &:hover {
    border: 7px solid Fuchsia;
    border-radius: 37px 37px 0px 37px;
    box-shadow: -1px 1px 25px Fuchsia;
  }
  &:hover:after {
    
    border-radius: 37px 37px 0px 37px;
  }
  &:hover:before {
    
   border-radius: 37px 37px 0px 37px;
  }
`;

function MarkerTags({ marker, onMouseDown = () => { }, onClick }) {
  const handleOnMouseDown = e => {
    onMouseDown(e, marker.idDetalleEtiquetaModulo);
  };

  return (
    <Marker
      onClick={(e) => onClick(marker.idEnclavamientoAlarma, e)}
      top={marker.arriba}
      left={marker.izquierda}
      onMouseDown={handleOnMouseDown}
    >
      {/* <FaLocationArrow /> */}
    </Marker>
  );
}

export default MarkerTags;
