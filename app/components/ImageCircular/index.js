/**
 *
 * ImageCircular
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled.div`
  background: url(${({ src }) => src}) no-repeat center center;
  width: ${({ width }) => `${width}px`};
  height: ${({ width }) => `${width}px`};
  border-radius: 50%;
  overflow: hidden;
  background-size: cover;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

function ImageCircular({ width, src }) {
  return <Image src={src} width={width} />;
}

ImageCircular.propTypes = {
  width: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
};

export default ImageCircular;
