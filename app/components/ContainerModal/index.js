/**
 *
 * ContainerModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0px
    ${({ paddingLeft }) => (paddingLeft ? `${paddingLeft}px` : '26px')};
  min-width: ${({ width, minWidth }) => width || `${minWidth}px`};
  display: ${({ flex }) => (flex ? 'flex' : 'block')};
  flex-direction: ${({ flex }) => (flex ? 'column' : 'none')};
  height: ${({ height, metric }) => (height ? `${height}${metric}` : 'auto')};
  overflow: auto;
`;

function ContainerModal({
  children,
  minWidth,
  paddingLeft,
  height,
  metric,
  width,
  flex,
  style,
}) {
  return (
    <Container
      style={style}
      minWidth={minWidth}
      paddingLeft={paddingLeft}
      height={height}
      metric={metric}
      flex={flex}
      width={width}
    >
      {children}
    </Container>
  );
}

ContainerModal.propTypes = {
  children: PropTypes.any,
  minWidth: PropTypes.number,
  paddingLeft: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.string,
  metric: PropTypes.string,
  flex: PropTypes.bool,
  style: PropTypes.object,
};

ContainerModal.defaultProps = {
  minWidth: 400,
};

export default ContainerModal;
