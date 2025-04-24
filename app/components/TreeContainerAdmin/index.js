/**
 *
 * TreeContainerAdmin
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserBox from 'V2/components/AdminUserBox';
import ModulesContainer from './Modules';
import { useMediaQuery } from 'react-responsive';

const TreeContainer = styled.div`
  width: ${({ theme }) => theme.admin.sidebarSize};
  height: 100vh;
  background: ${({ theme }) => theme.admin.colors.sideBar};
  position: fixed;
  /* Agrega las transiciones para el efecto de apertura/cierre */
  transition: width 0.3s ease;
  z-index: 10;
`;

const SidebarToggleButton = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 999;
  font-size: 24px;
  background: ${({ theme }) => theme.admin.colors.sideBar};
  border: 2px solid #000;
  border-radius: 40px;
  cursor: pointer;
  @media (min-width: 577px) {
    display: none;
  }
`;

function TreeContainerAdmin({
  modules,
  onItem,
  onLogout,
  onGoInterfaz,
  user,
  hasInterface,
  ...props
}) {
  const isDesktop = useMediaQuery({ minWidth: 577 }); 
  const [sidebarVisible, setSidebarVisible] = useState(isDesktop);

  useEffect(() => {
    // Actualiza la visibilidad del sidebar cuando cambia el estado de isMobile
    setSidebarVisible(isDesktop);
  }, [isDesktop]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <SidebarToggleButton onClick={toggleSidebar}>&#9776;</SidebarToggleButton>
      <TreeContainer style={{ width: sidebarVisible ? '300px' : '0' }}>
        <UserBox
          responsive={sidebarVisible}
          user={user}
          onLogout={onLogout}
          onGoInterfaz={onGoInterfaz}
          hasInterface={hasInterface}
        />
        <ModulesContainer modules={modules} onItem={onItem} {...props} />
      </TreeContainer>
    </>
  );
}

TreeContainerAdmin.propTypes = {
  modules: PropTypes.array,
  onItem: PropTypes.func,
  user: PropTypes.object,
  hasInterface: PropTypes.bool,
  onGoInterfaz: PropTypes.func,
  onLogout: PropTypes.func,
};

export default TreeContainerAdmin;
