/**
 *
 * ContainerScroll
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  max-height: ${({ maxHeight, metric }) => `${maxHeight}${metric}`};
  padding: ${({ padding }) => padding || 0};
  overflow: auto;
  width: 100%;
`;

function ContainerScroll({ children, maxHeight, metric, padding }) {
  return (
    <Container maxHeight={maxHeight} metric={metric} padding={padding}>
      {children}
    </Container>
  );
}

ContainerScroll.propTypes = {
  children: PropTypes.any,
  maxHeight: PropTypes.number,
  metric: PropTypes.string,
  padding: PropTypes.string,
};

ContainerScroll.defaultProps = {
  maxHeight: 100,
  metric: '%',
};

export default ContainerScroll;
