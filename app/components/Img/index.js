/**
 *
 * Img
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImgContainer = styled.img`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;

function Img({ width, height, src }) {
  return <ImgContainer src={src} width={width} height={height} />;
}

Img.propTypes = {
  width: PropTypes.any,
  height: PropTypes.any,
  src: PropTypes.string,
};

Img.defaultProps = {
  width: 'auto',
  height: 'auto',
};

export default Img;
