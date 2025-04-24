/**
 *
 * ButtonAdmin
 *
 */

import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

const Button = styled.button`
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: ${({ sm }) => (sm ? '25px' : '35px')};
  line-height: ${({ sm }) => (sm ? '25px' : '35px')};
  padding: 0px ${({ sm }) => (sm ? '13px' : '26px')};
  color: ${({ white, theme: { primary, base } }) => (white ? primary : base)};
  background: ${({ white, theme: { primary, base } }) =>
    white ? base : primary};
  font-weight: 600;
  letter-spacing: ${({ sm }) => (sm ? '0' : '0.8px')};
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  vertical-align: middle;
  white-space: nowrap;
  outline: none;
  border-radius: 25px;
  user-select: none;
  font-size: 11px;
  transition: all 0.3s ease-out;
  box-shadow: 0px 2px 5px 0px ${({ theme: { primary } }) => rgba(primary, 0.5)};
  svg {
    vertical-align: middle;
    font-size: 16px;
    font-weight: bold;
  }
  &:hover {
    background: ${({ white, theme: { primaryLight } }) =>
    white ? primaryLight : primaryLight};
    color: ${({ theme: { base } }) => base};
  }
`;

function ButtonAdmin(props) {
  return <Button {...props} />;
}

ButtonAdmin.propTypes = {};

export default ButtonAdmin;
