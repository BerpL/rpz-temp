/**
 *
 * NavbarAdmin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Bar = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  height: 60px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.12), 0 4px 4px rgba(0, 0, 0, 0.24);
  width: 100%;
  display: flex;
`;

function NavbarAdmin({ children, style }) {
  return <Bar style={style}>{children}</Bar>;
}

NavbarAdmin.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
};

export default NavbarAdmin;
