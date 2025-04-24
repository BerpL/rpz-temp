import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  width: ${({ theme }) => `calc(100% - ${theme.admin.sidebarSize})`};
  padding-left: 16px;
  margin-left: ${({ theme }) => theme.admin.sidebarSize};
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  position: absolute;
  padding-right: 16px;
  align-items: center;
  height: ${({ theme }) => theme.admin.headerSize};
  @media (max-width: 577px) {
    margin-top: 3rem;
    position: absolute;
  }
`;

const Name = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.admin.colors.text};
`;

function Navbar({ name }) {
  return (
    <Wrapper>
      <Name>{name}</Name>
    </Wrapper>
  );
}

Navbar.propTypes = {
  name: PropTypes.string,
};

export default Navbar;
