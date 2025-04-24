/**
 *
 * NavBarContainerAdmin
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import DropDown from 'components/DropDownUserNavbar';

const NavBar = styled.div`
  width: 100%;
  height: 70px;
  min-height: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

function NavBarContainerAdmin(props) {
  return (
    <NavBar>
      <DropDown {...props} />
    </NavBar>
  );
}

NavBarContainerAdmin.propTypes = {};

export default NavBarContainerAdmin;
