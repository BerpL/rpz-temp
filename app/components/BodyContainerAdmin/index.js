/**
 *
 * BodyContainerAdmin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ContainerFlex, Row } from 'components/ContainerFlex';

const BodyContainer = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function BodyContainerAdmin({ children }) {
  return (
    <BodyContainer>
      <ContainerFlex>
        <Row flexGrow="1" height="100%" padding="0 ">
          <BodyContainer>{children}</BodyContainer>
        </Row>
      </ContainerFlex>
    </BodyContainer>
  );
}

BodyContainerAdmin.propTypes = {
  children: PropTypes.any,
};

export default BodyContainerAdmin;
