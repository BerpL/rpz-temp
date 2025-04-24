/**
 *
 * ContainerFlex
 *
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-width: 1px;
  max-width: 100%;
  min-height: 1px;
  display: flex;
  flex-direction: column;
  color: #000000;
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
`;

function ContainerFlex({ children, ...props }, ref) {
  return <Wrapper ref={ref} {...props}>{children}</Wrapper>;
}

ContainerFlex.propTypes = {
  children: PropTypes.any,
};

export default forwardRef(ContainerFlex);
