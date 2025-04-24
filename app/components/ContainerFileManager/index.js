/**
 *
 * ContainerFileManager
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';

const Left = styled.div`
  flex: 0 0 250px;
  width: 250px;
  max-width: 250;
  padding-right: 26px;
  height: 100%;
  border-right: 1px solid ${({ theme: { primary } }) => rgba(primary, 0.2)};
`;

const Right = styled.div`
  width: ${({ width }) => width || 'calc(100% - 450px)'};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Media = styled.div`
  flex: 0 0 200px;
  max-width: 200px;
  height: 100%;
  width: 200px;
  border-left: 1px solid ${({ theme: { primary } }) => rgba(primary, 0.2)};
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Container = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
`;

function ContainerFileManager({ children }) {
  return (
    <Container>
      <InnerContainer>{children}</InnerContainer>
    </Container>
  );
}

ContainerFileManager.propTypes = {
  children: PropTypes.any,
};

export { Left, Right, Media };

export default ContainerFileManager;
