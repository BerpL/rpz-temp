/**
 *
 * GroupButtonsInline
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContainerInline = styled.div`
  display: flex;
  margin-bottom: 15px;
  button {
    margin: 0px 5px;
  }
`;

function GroupButtonsInline({ children, style }) {
  return <ContainerInline style={style}>{children}</ContainerInline>;
}

GroupButtonsInline.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
};

export default GroupButtonsInline;
