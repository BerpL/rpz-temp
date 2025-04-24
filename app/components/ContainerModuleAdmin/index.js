/**
 *
 * ContainerModuleAdmin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 0px 50px;
  margin: 0 auto;
  flex-direction: ${({ direction }) => direction};
  display: ${({ flex }) => (flex ? 'flex' : 'block')};
  height: ${({ height }) => (height ? `${height}%` : 'auto')};
`;

function ContainerModuleAdmin({ children, height, flex, direction }) {
  return (
    <Container height={height} direction={direction} flex={flex}>
      {children}
    </Container>
  );
}

ContainerModuleAdmin.propTypes = {
  children: PropTypes.any,
  height: PropTypes.number,
  flex: PropTypes.any,
  direction: PropTypes.any,
};

ContainerModuleAdmin.defaultProps = {
  direction: 'column',
};

export default ContainerModuleAdmin;
