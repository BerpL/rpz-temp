import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  width: ${({ theme }) => theme.admin.sidebarSize};
  flex-basis: ${({ theme }) => theme.admin.sidebarSize};
  flex-shrink: 0;
  height: 100vh;
  @media (max-width: 577px) {
    flex-shrink: 1;
    width: 300px;
  }
`;

function Sidebar({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

Sidebar.propTypes = {
  children: PropTypes.any,
};

export default Sidebar;
