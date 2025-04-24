import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  padding: 4px 8px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.admin.colors.primary};
  font-size: ${({ size }) => size || '14px'};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  user-select: none;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${({ theme }) => theme.admin.colors.primaryLight};
  }
  svg {
    margin-top: 1px;
    margin-right: 4px;
  }
`;

function Content({ onClick, children, size }) {
  return (
    <Container size={size} onClick={onClick}>
      {children}
    </Container>
  );
}

Content.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  size: PropTypes.number,
};

export default Content;
